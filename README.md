AngularDraft with Grunt
============
## Grunt Plugins:
- grunt-contrib-htmlmin
- grunt-contrib-less
- grunt-contrib-concat
- grunt-contrib-cssmin
- grunt-uncss
- grunt-merge-json
- grunt-jsonmin
- grunt-contrib-uglify
- grunt-newer
- grunt-contrib-watch

### "npm install"
- Open a new terminal window on the folder **AngularDraft_Grunt** and run this command **npm install** to install all the dependencies inside the file **package.json** needed for Grunt and Grunt Task's to run. 

### "grunt"
- Executing the command **grunt**, will create a new folder 'dest/..' with the project optimized. 
- A folder named **_temp/deletable/..** will also be created in the root project, this folder can be deleted.

### "npm install http-server -g"
- This command will install the http-server globally.
- For the app to work you need a http-server and if you dont have one installed, this command will fix that.<br/>
- Check more documentation about http-server here: https://github.com/nodeapps/http-server <br/>

### "http-server"
- On the newly created folder named **dest** open a terminal windows and run the **http-server** command to start the simple http-server on that folder.
