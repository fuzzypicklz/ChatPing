/// <reference types="../CTAutocomplete" />
/// <reference lib="es2015" />

const display = new Display();
const Ykey = Client.getKeyBindFromKey(Keyboard.KEY_Y, "Y");
const Nkey = Client.getKeyBindFromKey(Keyboard.KEY_N, "N");
const Xkey = Client.getKeyBindFromKey(Keyboard.KEY_X, "X");

// This is where all the file IO stuff will happen.
function checkForFile(){
    // see if the file exists or not
    if(FileLib.exists('./config/triggerList.cfg')){
        return true
    }
    else{
        FileLib.write('./config/triggerList.cfg', "");
    }
    
}

function addText(text){
    // append text to the file
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    FileLib.append('./config/triggerList.cfg', text + "^&$");
}

function remove(index){
    // convert the file to an array, then remove index "index" from it
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    triggersArray.splice(index, 1)
    let weirdCSV = triggersArray.join("^&$");
    FileLib.delete('./config/triggerList.cfg');
    FileLib.write('./config/triggerList.cfg', weirdCSV);

}

function wipe(){
    // delete all data on the file
    FileLib.delete('./config/triggerList.cfg');
    FileLib.write('./config/triggerList.cfg', "");
}

function fileToArray(){
    //converts it to an array, then returns it. simple.
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");

    return triggersArray;
}

let dataFile = checkForFile();
display.setAlign("center");

register("worldLoad", () => {
    ChatLib.chat("[CP]: ChatPing is ENABLED! do /cp or /chatping for more info.");
});

register("chat", (message, event) => {
    if(message in fileToArray()){
        display.addLine(
            new DisplayLine("PING").setTextColor(Renderer.RED)
          );
          display.addLine(
            new DisplayLine("press the X key to remove this text.").setTextColor(Renderer.ORANGE)
          );
            World.playSound("mob.cat.purreow", 10, 5)
          if(Xkey.isPressed()){
            display.setline(0, "");
            display.setline(1, "");
          }
          
        // play a sound or sth
    }
});

register("command", (...args) => { // goal is to return a message, format shown below
    
    if(args[0].toLowerCase() == "add"){
        if(args[1]){
            args.pop(); 
            // convert args into a string called "words"
            let words = args.join(' ')+"^&$"; // ^&$ is just a marker so that fileModel functions know where to split the array
            addText(words); // create function that puts it into the function and reloads it here
            ChatLib.chat("[CP]: Successfully added trigger. Do /cp display to show all active triggers.");
        }
    }
    else if(args[0].toLowerCase() == "remove"){
        if(args[1] && !args[2]){
            remove(args[1]);
            ChatLib.chat("[CP]: Successfully removed trigger. Do /cp display to show all active triggers.");
        }
    }
    else if(args[0].toLowerCase() == "wipe"){
        ChatLib.chat("[CP]: Are you sure you want to do this? Press Y/N");
        if(Ykey.isPressed()){
            wipeFile();
            ChatLib.chat("[CP]: Wipe successful.");
        }
        if(Nkey.isPressed()){
            ChatLib.chat("[CP]: Aborted wipe.");
        }
    }
    else if(args[0].toLowerCase() == "display"){
        let triggers = fileToArray();

        for(var i = 0; i<=triggers.length-1; i++){
            Chatlib.chat(i+": "+triggers[i]);
        }

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