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
    if(index>triggersArray.length-1){
        return false;
    }
    else{
        triggersArray.splice(index, 1)
        let weirdCSV = triggersArray.join("^&$");
        FileLib.delete('./config/triggerList.cfg');
        FileLib.write('./config/triggerList.cfg', weirdCSV);
        return true;
    }
    

}

function wipe(){
    // delete all data on the file
    FileLib.delete('./config/triggerList.cfg');
    FileLib.write('./config/triggerList.cfg', "");
}

function fileToArray(){
    //converts it to an array, then returns it. simple.
    let triggersArray = FileLib.read('./config/triggerList.cfg').toString().split("^&$");
    triggersArray.pop();
    return triggersArray;
}

let dataFile = checkForFile();
display.setAlign("center");

register("worldLoad", () => {
    ChatLib.chat("[CP]: ChatPing is ENABLED! do /cp or /chatping for more info.");
});

register("chat", (event) => {
    console.log("do you hear the flibberty jibber jabber oh my god I gotta get out or I'm gonna have another work to sell another story to tell another time piece ringing the bell do you hear the clock stop when you reach the end no you don't so it must be neverending comprehend if you can but if you try to prentend you understand you resemble a fool and you're only a man so give it up and smile")
    let msg = ChatLib.getChatMessage(event,false);
    console.log(msg);
    if(fileToArray().includes(msg.toString())){
        
        ChatLib.chat("[CP]: \""+msg+"\" has triggered a ping!");
        World.playSound("mob.ghast.affectionate_scream", 100, 0.3);  
        // play a sound or sth
    }
});

register("command", (...args) => { // goal is to return a message, format shown below
    if(!args[0]){
        //explain that they're missing args
        World.playSound("mob.cat.purreow", 100, 1);
        
        ChatLib.chat("---- ChatPing ----");
        ChatLib.chat("bla bla bla yeah we get it");
    }
    else{
        switch(args[0].toLowerCase()){
            default:
                ChatLib.chat("---- ChatPing ----");
                ChatLib.chat("bla bla bla yeah we get it");
            case "add":
                if(args[1]){
                    args.shift();
                    // convert args into a string called "words"
                    let words = args.join(' '); // ^&$ is just a marker so that fileModel functions know where to split the array
                    addText(words); // create function that puts it into the function and reloads it here
                    ChatLib.chat("[CP]: Successfully added trigger. Do /cp display to show all active triggers.");
                    World.playSound("mob.cat.meow", 100, 1);
                    break;
                }
                else{
                    //explain that they're missing args
                    ChatLib.chat("[CP]: Addition failed. Missing arguments!");
                    break;
                }
            case "remove":
                if(args[1]){
                    if(remove(args[1]) === true){
                        ChatLib.chat("[CP]: Successfully removed trigger. Do /cp display to show all active triggers.");
                    }
                    else{
                        ChatLib.chat("[CP]: Removal failed. Bad index number. Try a number listed in /cp display!");
                    }
                    break;
                }
                else{
                    //explain that they're missing args
                    ChatLib.chat("[CP]: Removal failed. Missing index number. Try a number listed in /cp display!");
                    break;
                }
            case "wipe":
                ChatLib.chat("[CP]: Are you sure you want to do this? Press Y/N");
                if(Ykey.isPressed()){
                    wipeFile();
                ChatLib.chat("[CP]: Wipe successful.");
                }
                if(Nkey.isPressed()){
                    ChatLib.chat("[CP]: Aborted wipe.");
                }
            case "display":
                let triggers = fileToArray();
                ChatLib.chat("[CP] Currently active keywords:")
                
                for(var i = 0; i<=triggers.length-1; i++){
                    ChatLib.chat(i+": "+triggers[i]);
                }
        }
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