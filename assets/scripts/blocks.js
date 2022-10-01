$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

var dat = new Date();
datee = dat.toLocaleDateString();
timee = dat.toLocaleTimeString();

Blockly.Blocks['block_type'] = {
  init: function() {
    this.appendStatementInput("Bot")
        .setCheck(null)
        .appendField(new Blockly.FieldLabelSerializable("Bot"), "Bot");
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['block_type'] = function(block) {
  var statements_bot = Blockly.JavaScript.statementToCode(block, 'Bot');
  // TODO: Assemble JavaScript into code variable.
  return statements_bot;
};

Blockly.Blocks['dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField("Pick one ")
      .appendField(new Blockly.FieldDropdown([["What is the date Today?",`${datee}`], ["What is the time now?",`${timee}`], ["How are you?","Fine, What about you?"], ["What is JavaScript?","Javascript is a scripting language that enables you to dynamically interact with web pages"], ["What is your name?","Abhishek Vishwakarma"]]), "NAME");
    this.setPreviousStatement(true);
    this.setColour(130);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.JavaScript['dropdown'] = function (block) {
  if(!block.getParent()) return ' ';
  var text_input = block.getFieldValue('NAME');
  var code = `
	var inputTextValue = "${text_input}"`;
  return code;
};

var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    console.log(inputTextValue);
    $("#inputBox").text(inputTextValue);
  } else {
    console.log("Hello");
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  workspace.clear();
  redrawUi();
}


