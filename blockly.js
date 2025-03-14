window.sendCommand = function(command) {
    if (window.BlocBlocklyChannel) {
        window.BlocBlocklyChannel.postMessage(command);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("🔄 Inițializare Blockly...");

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
        return `window.runCommands = function() {\n${statements}};\n`;
    };

    Blockly.Blocks['move_forward'] = {
        init: function() {
            this.appendDummyInput().appendField("Mergi înainte");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['move_forward'] = function(block) {
        return 'window.sendCommand("UP");\n';
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
        return 'window.sendCommand("DOWN");\n';
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
        return 'window.sendCommand("LEFT");\n';
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
        return 'window.sendCommand("RIGHT");\n';
    };

    var workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });
    console.log("✅ Blockly este activ!");

    window.runProgram = function() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log("📤 Cod generat:\n" + code);

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
