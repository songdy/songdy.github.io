# again-weixin

1. ### 项目配置  

    * #### 配置文件  
    见路径： `/again-weixin/app/scripts/providers/globalConfig.js`

    * #### 配置项：
      * apihost: api服务器地址
      * clienthost：微信公众号客户端地址
      * wxAppid： 微信公众号的APPID
      * aboutAgain: 再来的介绍页地址

1. ### 打包项目  

    * #### 打包环境：node, grunt, bower  

    * #### 打包命令：  
      ```
      -> npm install

      -> bower install --allow-root

      -> grunt build:dist;
      ```

      > * 打包成功后，在项目根目录下会生成dist目录  
      > * 请确保npm的包安装成功  


1. ### 配置Nginx  
    ```
    server{
    listen       80; #监听端口
    server_name  again.51b.log; #微信公众号客户端域名;
    location / {
        root  /mnt/apps/again-weixin/dist; #项目路径，请指向项目文件夹下的dist目录
        index index.html;
        try_files $uri $uri/ /index.html =404;
      }
    }
    ```

    > 带`#`号的为可修改的部分，其它部分不建议修改
