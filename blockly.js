window.sendCommand = function(command) {
    if (window.BlocBlocklyChannel) {
        window.BlocBlocklyChannel.postMessage(command);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    console.log("Inițializare Blockly...");

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

        var commands = statements.split("\n")
            .map(cmd => cmd.replace("// ", "").trim())
            .filter(cmd => cmd !== "")
            .map(cmd => `window.sendCommand(${cmd});`)
            .join("\n");

        return `window.runCommands = function() {\n${commands}\n};\n`;
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
        return '// "UP"\n';
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
        return '// "DOWN"\n';
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
        return '// "LEFT"\n';
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
        return '// "RIGHT"\n';
    };

    Blockly.Blocks['repeat_n'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Repeta de")
                .appendField(new Blockly.FieldNumber(2, 1), "COUNT")
                .appendField("ori");
            this.appendStatementInput("DO")
                .setCheck(null);
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(180);
        }
    };

    Blockly.JavaScript.forBlock['repeat_n'] = function(block) {
        var count = block.getFieldValue("COUNT");
        var statements = Blockly.JavaScript.statementToCode(block, 'DO');

        return `for (let i = 0; i < ${count}; i++) {\n${statements}}\n`;
    };

    var workspace = Blockly.inject('blocklyDiv', { toolbox: document.getElementById('toolbox') });
    console.log("Blockly este activ!");

    window.runProgram = function() {
        var code = Blockly.JavaScript.workspaceToCode(workspace);
        console.log(" Cod generat:\n" + code);

        if (code.includes("window.runCommands")) {
            try {
                eval(code);
                window.runCommands();
            } catch (error) {
                console.error("Eroare la execuție:", error);
            }
        } else {
            console.warn(" Nu există un bloc 'on start'. Comenzile nu vor fi executate!");
        }
    };
});
