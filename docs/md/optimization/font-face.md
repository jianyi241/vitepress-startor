# 前端加载自定义字体加载速度对比

## 1. 传统CSS`@font-face`方式

```scss
@font-face {
    font-family: 'MyFont';
    src: url('my-font.woff2') format('woff2');
}
```
**加载流程：**
1. 浏览器解析CSS文件
2. 遇到@font-face规则
3. 下载字体文件
4. 解析字体文件
5. 将字体添加到文档中
6. 使用字体

## 2. JavaScript `FontFace API`方式

```ts
// 在main.ts中立即执行
fontLoader.preloadFonts([
  { family: 'ZTCQXJH', url: '/src/assets/font/my-font.woff2' }
]);
```
**加载流程：**
1. JavaScript立即执行
2. 创建FontFace对象
3. 主动开始下载字体
4. 下载完成后注册到document.fonts
5. 使用字体

**两者差异对比：**
|方面	|CSS @font-face	|JavaScript FontFace API
|----------|---------------------|---------------------
|启动时机	|等待CSS解析完成	|立即启动
|加载控制	|被动等待	|主动控制
|并行能力	|依赖浏览器	|完全控制
|错误处理	|有限	|完全控制
|加载状态	|无法检测	|可实时监控
|优先级	|中等	|高优先级


**时间节省：**
 - CSS方式：需要等待HTML → CSS解析 → 发现字体URL → 开始下载
 - JS方式：直接开始下载，节省了CSS解析时间


## 在vite项目中使用`Font Face API`方式

 **font-loader.ts**

 ```ts
/**
 * 字体加载优化工具
 * 用于检测字体加载状态，减少字体闪动
 */

export class FontLoader {
  private static instance: FontLoader;
  private loadedFonts = new Set<string>();

  static getInstance(): FontLoader {
    if (!FontLoader.instance) {
      FontLoader.instance = new FontLoader();
    }
    return FontLoader.instance;
  }

  /**
   * 检测字体是否已加载
   */
  isFontLoaded(fontFamily: string): boolean {
    return this.loadedFonts.has(fontFamily);
  }

  /**
   * 预加载字体
   */
  preloadFont(fontFamily: string, fontUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.loadedFonts.has(fontFamily)) {
        resolve();
        return;
      }

      // 创建字体对象
      const font = new FontFace(fontFamily, `url(${fontUrl})`);
      
      font.load()
        .then(() => {
          // 将字体添加到文档中
          (document.fonts as any).add(font);
          this.loadedFonts.add(fontFamily);
          console.log(`字体 ${fontFamily} 加载成功`);
          resolve();
        })
        .catch((error) => {
          console.warn(`字体 ${fontFamily} 加载失败:`, error);
          reject(error);
        });
    });
  }

  /**
   * 批量预加载字体
   */
  async preloadFonts(fonts: Array<{ family: string; url: string }>): Promise<void> {
    const promises = fonts.map(font => this.preloadFont(font.family, font.url));
    
    try {
      await Promise.allSettled(promises);
      console.log('字体预加载完成');
    } catch (error) {
      console.warn('部分字体加载失败:', error);
    }
  }

  /**
   * 添加字体加载完成的CSS类
   */
  addFontLoadedClass(fontFamily: string): void {
    if (this.loadedFonts.has(fontFamily)) {
      document.documentElement.classList.add(`font-${fontFamily.toLowerCase()}-loaded`);
    }
  }
}

// 导出单例实例
export const fontLoader = FontLoader.getInstance(); 
 ```


 **main.ts** 中引用
 ```ts
 // 字体加载优化 有效防止文字闪烁
import { fontLoader } from './util/font-loader'

// 预加载关键字体
fontLoader.preloadFonts([
  { family: 'ZTCQXJH', url: '/src/assets/font/ZiTiChuanQiXueJiaHei.ttf' },
  { family: 'RobotoRegular', url: '/src/assets/font/Roboto-Regular.ttf' },
  { family: 'BambooStone', url: '/src/assets/font/Bamboo-Stone.ttf' }
]);
```


## 总结
 当加载多个字体时，并且字体文件比较大时，优先选用`Font Face API`方式预加载字体文件，避免字体在加载时字体加载过慢导致文字应用字体时闪烁问题。当字体文件较小时，可直接使用`@fong-face`方式