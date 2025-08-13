import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "前端记录",
  description: "记录一些前端有趣的知识和烦人的玩意",
  
  // 配置中文语言包
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: '前端记录',
      description: '记录一些前端有趣的知识和烦人的玩意'
    }
  },
  
  themeConfig: {
    i18nRouting: false,
    // 设置中文界面文本
    siteTitle: '前端记录',
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '切换深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    
    // 页面导航相关的中文配置
    outline: {
      label: '页面导航',
      level: [2, 3]
    },
    
    // 搜索相关的中文配置
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                }
              }
            }
          }
        }
      }
    },
    
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '架构', link: '/md/framework/index.md' },
      { text: '优化', link: '/md/optimization/font-face.md' },
      { text: 'Javascript', link: '/md/javascript/issue.md' },
      {
        text: 'React Native',
        link: '/md/rn/rn'
      },
      { text: 'Other', link: '/md/web/powershell_problem' }
    ],

    sidebar: [
      {
        text: '架构',
        items: [
          { text: '前端架构与渲染模式对比', link: '/md/framework/index.md' },
        ]
      },
      {
        text: 'Javascript',
        items: [
          { text: '一些Javascript相关问题', link: '/md/javascript/issue.md' },
        ]
      },
      {
        text: '优化',
        items: [
          { text: '前端加载自定义字体加载速度对比', link: '/md/optimization/font-face.md' },
        ]
      },
      {
        text: 'React Native',
        items: [
          {
            text: 'React Native坑点和技巧',
            link: '/md/rn/rn'
          },
          {
            text: '运行到真机调试',
            link: '/md/rn/run_in_phone',
          },
          {
            text: '集成到原生应用（Bundle方式）',
            link: '/md/rn/rn_integrated_app',
          },
          {
            text: '底座app集成 React Native 方案设计(转)',
            link: '/md/rn/底座app集成 React Native 方案设计',
          }
        ]
      },
      {
        text: 'Other',
        items: [
          { text: 'powershell无法使用npm命令问题', link: '/md/web/powershell_problem' },
          { text: 'CentOS7更换yum源', link: '/md/back/centos_change_yum' },
          { text: 'CentOS7安装mysql5.7', link: '/md/back/centos_install_mysql5.7'},
          { text: 'CentOS7安装mysql5问题记录', link: '/md/back/centos_mysql5_install'},
          { text: '为nginx部署的项目配置免费证书', link: '/md/back/ssl_free'}
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.gg/vue' },
      // 自定义SVG图标示例
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>'
        },
        link: 'https://example.com'
      }
    ]
  }
})
