window.sendCommand = function(command) {
    if (window.BlocBlocklyChannel) {
        window.BlocBlocklyChannel.postMessage(command);
        console.log("📡 [JS] Comandă trimisă către Flutter: " + command);
        console.log(" Comandă trimisă către Flutter: " + command);
    } else {
        console.log("⚠️ [JS] WebView nu este integrat cu Flutter. Comandă: " + command);
        console.log("WebView nu este integrat cu Flutter. Comandă: " + command);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("🔄 Inițializare Blockly...");

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
    console.log("✅ Blockly inițializat!");
    console.log(" Blockly merge");

    window.runProgram = function() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log("📤 [JS] Cod generat:\n" + code);
        console.log("Cod:\n" + code);
        try {
            eval(code);
        } catch (error) {
            console.error("❌ [JS] Eroare la execuția codului Blockly:", error);
            console.error("Eroare la Blockly:", error);
        }
    };
});