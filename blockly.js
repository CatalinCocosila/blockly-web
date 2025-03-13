window.sendCommand = function(command) {
    try {
        if (window.BlocBlocklyChannel) {
            window.BlocBlocklyChannel.postMessage(command);
        }
    } catch (error) {
        console.error("Eroare la trimiterea comenzii către Flutter:", error);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    Blockly.Blocks['move_forward'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-up-solid.svg", 20, 20, "*"))
                .appendField("Mergi înainte");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript['move_forward'] = function(block) {
        return 'window.sendCommand("UP");\n';
    };

    Blockly.Blocks['move_backward'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-down-solid.svg", 20, 20, "*"))
                .appendField("Mergi înapoi");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript['move_backward'] = function(block) {
        return 'window.sendCommand("DOWN");\n';
    };

    Blockly.Blocks['turn_left'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-left-solid.svg", 20, 20, "*"))
                .appendField("Rotire stânga");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript['turn_left'] = function(block) {
        return 'window.sendCommand("LEFT");\n';
    };

    Blockly.Blocks['turn_right'] = {
        init: function() {
            this.appendDummyInput()
                .appendField(new Blockly.FieldImage("icons/arrow-right-solid.svg", 20, 20, "*"))
                .appendField("Rotire dreapta");
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(230);
        }
    };
    Blockly.JavaScript['turn_right'] = function(block) {
        return 'window.sendCommand("RIGHT");\n';
    };

    try {
        const workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });

        window.runProgram = function() {
            try {
                const code = Blockly.JavaScript.workspaceToCode(workspace);
                eval(code);
            } catch (error) {
                console.error( " Eroare la execuția codului Blockly:", error);
            }
        };
    } catch (error) {
        console.error("Eroare la inițializarea Blockly:", error);
    }
});
