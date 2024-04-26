

import * as blessed from 'blessed'
import { exec } from 'child_process'
import * as contrib from 'blessed-contrib'
import * as fs from 'fs'
import * as path from 'path'


class CommandList {
  parent: blessed.Widgets.Screen
  msg: blessed.Widgets.MessageElement

  constructor(parent: blessed.Widgets.Screen, msg: blessed.Widgets.MessageElement) {
    this.parent = parent
    this.msg = msg
  }

  create(commands: string[]) {
    // read from file
    try {
      const commandsStored = fs.readFileSync(path.join(__dirname, 'commands'), 'utf8')
      // insert loaded commands to the list
      commandsStored.split('\n').forEach(command => {
        commands.push(command)
      })
    } catch (err) {
      console.error(err)
    }

    const list: blessed.Widgets.ListElement = blessed.list({
      // https://github.com/chjj/blessed?tab=readme-ov-file#list-from-box
      parent: this.parent,
      label: ' {bold}{cyan-fg}Command List{/cyan-fg}{/bold} ',
      tags: true,
      draggable: true,
      top: 0,
      right: 0,
      width: 50,
      height: '50%',
      keys: true,
      vi: true,
      mouse: true,
      border: 'line',
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan'
        },
        style: {
          inverse: true
        }
      },
      style: {
        item: {
          hover: {
            bg: 'blue'
          }
        },
        selected: {
          bg: 'blue',
          bold: true
        }
      },
      // search: function (callback) {
      //     prompt.input('Search:', '', function (err, value) {
      //         if (err) return;
      //         return callback(null, value);
      //     });
      // }
    });
    list.setItems(commands);
    list.focus();

    list.enterSelected(0)

    commands.forEach((command, index) => {
      const aLine = list.getItem(index)
      aLine.setHover(aLine.getText())
    })

    const _this = this
    list.on('select', function (el, selected) {
      if (list._.rendering) return;
      _this.msg.error("errnamh")
      // run dir
      exec("dir", (err, stdout, stderr) => {
        if (err) {
          _this.msg.error(err.message)
          return
        }
        if (stderr) {
          _this.msg.error(stderr)
          return
        }
        _this.msg.log(stdout)
      })

    })


  }

}

const screen: blessed.Widgets.Screen = blessed.screen({
  smartCSR: true,
})
screen.title = "wsl commander"
screen.fullUnicode = true // for unicode characters

//create layout and widgets



// const grid: contrib.Widgets.GridElement = new contrib.grid({ rows: 12, cols: 12, screen: screen })

// /**
//  * Donut Options
//   self.options.radius = options.radius || 14; // how wide is it? over 5 is best
//   self.options.arcWidth = options.arcWidth || 4; //width of the donut
//   self.options.yPadding = options.yPadding || 2; //padding from the top
//  */
// var donut: contrib.Widgets.DonutElement = grid.set(8, 8, 4, 2, contrib.donut,
//   {
//     label: 'Percent Donut',
//     radius: 16,
//     arcWidth: 4,
//     yPadding: 2,
//     data: [{ label: 'Storage', percent: 87 }]
//   })


var prompt = blessed.prompt({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: 'shrink',
  keys: true,
  vi: true,
  mouse: true,
  tags: true,
  border: 'line',
  hidden: false
});

var msg = blessed.message({
  parent: screen,
  top: 'center',
  left: 'center',
  height: 'shrink',
  width: '50%',
  align: 'center',
  tags: true,
  hidden: true,
  border: 'line'
});


const cmdlist = new CommandList(screen, msg);
cmdlist.create(['test1', 'test2']);


// const listbar = blessed.listbar({
//     top: 'center',
//     left: 'center',
//     width: '50%',
//     height: '50%',
//     // content: 'Hello {bold}world{/bold}!',
//     // tags: true,
//     border: {
//         type: 'line'
//     },
//     style: {
//         item: {
//             bg: '#ffffff'
//         },
//         fg: 'white',
//         bg: 'magenta',
//         border: {
//             fg: '#f0f0f0'
//         },
//         hover: {
//             bg: 'green'
//         }
//     },
//     items: [{
//         key: 'a', callback() {
//             console.log('tetenmah')
//         },
//     }],
//     commands: [],
//     autoCommandKeys: true   // bind keys to 0-9
// })
// screen.append(listbar)

// listbar.on('select', (item, index) => {
//     screen.render();
//     screen.log(`Selected: ${item.key}`);
// });
screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

screen.render()
