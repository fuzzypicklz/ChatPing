const fileModel = require("../models/fileModel");

const display = new Display();
const Ykey = Client.getKeyBindFromKey(Keyboard.KEY_Y, "Y");
const Nkey = Client.getKeyBindFromKey(Keyboard.KEY_N, "N");
const Xkey = Client.getKeyBindFromKey(Keyboard.KEY_X, "X");
let dataFile = fileModel.checkforFile();

display.setAlign("center");

register("worldLoad", () => {
    ChatLib.chat("[CP]: ChatPing is ENABLED! do /cp or /chatping for more info.");
});

register("chat", (message, event) => {
    if(message in fileModel.fileToArray(dataFile)){
        display.addLine(
            new DisplayLine("PING").setTextColor(Renderer.RED)
          );
          display.addLine(
            new DisplayLine("press the X key to remove this text.").setTextColor(Renderer.ORANGE)
          );
        
          if(Xkey.isPressed()){
            display.setline(0, "");
            display.setline(1, "");
          }
        // play a sound or sth
    }
});

register("command", (user) => { // goal is to return a message, format shown below
    let args[] = [] // placeholder
    
    if(args[0].toLowerCase() == "add"){
        if(args[1]){
            args.pop(0);
            // convert args into a string called "words"
            words = null;
            fileModel.addText(words, dataFile); // create function that puts it into the function and reloads it here
            ChatLib.chat("[CP]: Successfully added trigger. Do /cp display to show all active triggers.");
        }
    }
    else if(args[0].toLowerCase() == "remove"){
        if(args[1] && !args[2]){
            fileModel.remove(args[1], dataFile);
            ChatLib.chat("[CP]: Successfully removed trigger. Do /cp display to show all active triggers.");
        }
    }
    else if(args[0].toLowerCase() == "wipe"){
        ChatLib.chat("[CP]: Are you sure you want to do this? Press Y/N");
        if(Ykey.isPressed()){
            fileModel.wipeFile(dataFile);
            ChatLib.chat("[CP]: Wipe successful.");
        }
        if(Nkey.isPressed()){
            ChatLib.chat("[CP]: Aborted wipe.");
        }
    }
    else if(args[0].toLowerCase() == "display"){
        fileModel.display(dataFile);
    }
    else{
        ChatLib.chat("---- ChatPing ----");
        ChatLib.chat("bla bla bla yeah we get it");
    }
  }).setName("chatping").setAliases("cp");


  /*
  ---- ChatPing ----
  /chatping or /cp
  a lightweight system to notify you when a chat message is sent!
  /cp add <text>: adds <text> as a trigger to ping you
  /cp remove <index>: removes trigger at index <index>
  /cp wipe: resets all triggers
  /cp display: displays triggers
  */