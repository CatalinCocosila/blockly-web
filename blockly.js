window.sendCommand = function(command) {
    if (window.BlocBlocklyChannel) {
        window.BlocBlocklyChannel.postMessage(command);
    } 
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("🔄 Inițializare Blockly...");

    Blockly.Blocks['move_forward'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-up-solid.svg", 20, 20, "*")) // SVG local
                .appendField("Mergi înainte");
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
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-down-solid.svg", 20, 20, "*")) // SVG local
                .appendField("Mergi înapoi");
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
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-left-solid.svg", 20, 20, "*")) // SVG local
                .appendField("Rotire stânga");
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
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-right-solid.svg", 20, 20, "*")) // SVG local
                .appendField("Rotire dreapta");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript.forBlock['turn_right'] = function(block) {
        return 'window.sendCommand("RIGHT");\n';
    };

    const workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });

    window.runProgram = function() {
        const code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log("Cod generat:\n" + code);
    };
});
