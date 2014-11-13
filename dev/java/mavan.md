# Apache Maven

Maven是Java项目的自动构建工具，描述项目构建过程和依赖关系。

它的配置文件是pom.xml。

```xml

<project>
  <!-- model version is always 4.0.0 for Maven 2.x POMs -->
  <modelVersion>4.0.0</modelVersion>
 
  <!-- project coordinates, i.e. a group of values which
       uniquely identify this project -->
 
  <groupId>com.mycompany.app</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0</version>
 
  <!-- library dependencies -->
 
  <dependencies>
    <dependency>
 
      <!-- coordinates of the required library -->
 
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
 
      <!-- this dependency is only used for running and compiling tests -->
 
      <scope>test</scope>
 
    </dependency>
  </dependencies>
</project>

```
