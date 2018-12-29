# node全栈之博客系统 

#需要技术站
node 
bower  install -g bower  前端管理工具
gulp   install --global  gulp  自动化构建工具
yo     npm install -g yo  自动构建webApp


#项目初始化：
  生成器： generator-express
  项目： editorconfig 、 bowerrc 、 gitignore 、gulpfile
  前端： bower + bootstrap
  后端： model + controller + view + config

先安装 npm install generator-express -g

cd project  yo
 ->express
 ? Would you like to create a new directory for your project? No
? Select a version to install: MVC
? Select a view engine to use: Pug
? Select a css preprocessor to use: None
? Select a database to use: MongoDB
? Select a build tool to use: Gulp


#启动项目：
  gulp   (注意：npm run start，项目不会热跟新)


字体库： bower  font-awesome@4

数据库： MongoDB

 json编辑器  ：https://www.json-generator.com