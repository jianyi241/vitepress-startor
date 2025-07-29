import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  lang: 'zh-CN',
  title: "前端记录",
  description: "记录一些前端有趣的知识和烦人的玩意",
  themeConfig: {
    i18nRouting: false,
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '杂七杂八问题', link: '/md/web/powershell_problem' },
      {
        text: 'React Native',
        link: '/md/rn/rn'
      }
    ],

    sidebar: [
      {
        text: '杂七杂八问题',
        items: [
          { text: 'powershell无法使用npm命令问题', link: '/md/web/powershell_problem' },
          { text: 'CentOS7更换yum源', link: '/md/back/centos_change_yum' },
          { text: 'CentOS7安装mysql5.7', link: '/md/back/centos_install_mysql5.7'},
          { text: 'CentOS7安装mysql5问题记录', link: '/md/back/centos_mysql5_install'},
          { text: '为nginx部署的项目配置免费证书', link: '/md/back/ssl_free'}
        ]
      },
      {
        text: 'React Native 跨平台开发指南',
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
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
