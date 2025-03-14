window.sendCommand = function(command) {
    if (window.BlocBlocklyChannel) {
        window.BlocBlocklyChannel.postMessage(command);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("🔄 Inițializare Blockly...");

    // 📌 Bloc "on_start" - toate comenzile trebuie să fie în acest bloc
    Blockly.Blocks['on_start'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("on start");
            this.appendStatementInput("DO")
                .setCheck(null);
            this.setColour(120);
        }
    };

    Blockly.JavaScript.forBlock['on_start'] = function(block) {
        var statements = Blockly.JavaScript.statementToCode(block, 'DO');
        
        // 🚀 Aici adăugăm `window.sendCommand()` pentru fiecare comandă
        var commands = statements.split(",\n").map(cmd => `window.sendCommand(${cmd.trim()});`).join("\n");
        
        return `window.runCommands = function() {\n${commands}\n};\n`;
    };

    // 📌 Blocuri de mișcare - Acum returnează doar textul direcției
    Blockly.Blocks['move_forward'] = {
        init: function() {
            this.appendDummyInput().appendField("Mergi înainte");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['move_forward'] = function(block) {
        return '"UP",\n';
    };

    Blockly.Blocks['move_backward'] = {
        init: function() {
            this.appendDummyInput().appendField("Mergi înapoi");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['move_backward'] = function(block) {
        return '"DOWN",\n';
    };

    Blockly.Blocks['turn_left'] = {
        init: function() {
            this.appendDummyInput().appendField("Rotire stânga");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['turn_left'] = function(block) {
        return '"LEFT",\n';
    };

    Blockly.Blocks['turn_right'] = {
        init: function() {
            this.appendDummyInput().appendField("Rotire dreapta");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['turn_right'] = function(block) {
        return '"RIGHT",\n';
    };

    // 📌 Inițializare Blockly
    var workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });
    console.log("✅ Blockly este activ!");

    // 📌 Buton de rulare program (execută doar codul din `on_start`)
    window.runProgram = function() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log("📤 Cod generat:\n" + code);

        // 🛑 Caută `window.runCommands` în codul generat
        if (code.includes("window.runCommands")) {
            try {
                eval(code);
                window.runCommands(); // Rulează doar comenzile din `on_start`
            } catch (error) {
                console.error("❌ Eroare la execuție:", error);
            }
        } else {
            console.warn("⚠️ Nu există un bloc 'on start'. Comenzile nu vor fi executate!");
        }
    };
});
