

import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'


class CommandList {
  private parent: blessed.Widgets.Screen
  constructor(parent: blessed.Widgets.Screen) {
    this.parent = parent
  }

  create(commands: string[]) {
    const list = blessed.list({
      // https://github.com/chjj/blessed?tab=readme-ov-file#list-from-box
      parent: this.parent,
      label: ' {bold}{cyan-fg}Command List{/cyan-fg}{/bold} ',
      tags: true,
      draggable: true,
      top: 0,
      right: 0,
      width: 100,
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
  }

  get commands() {
    return ['test1', 'test2']
  }
}

const screen: blessed.Widgets.Screen = blessed.screen({
  smartCSR: true,
})
screen.title = "wsl commander"
//create layout and widgets

const grid: contrib.Widgets.GridElement = new contrib.grid({ rows: 12, cols: 12, screen: screen })

/**
 * Donut Options
  self.options.radius = options.radius || 14; // how wide is it? over 5 is best
  self.options.arcWidth = options.arcWidth || 4; //width of the donut
  self.options.yPadding = options.yPadding || 2; //padding from the top
 */
var donut: contrib.Widgets.DonutElement = grid.set(8, 8, 4, 2, contrib.donut,
  {
    label: 'Percent Donut',
    radius: 16,
    arcWidth: 4,
    yPadding: 2,
    data: [{ label: 'Storage', percent: 87 }]
  })

// var list = blessed.list({
//   // https://github.com/chjj/blessed?tab=readme-ov-file#list-from-box
//   parent: screen,
//   label: ' {bold}{cyan-fg}Command List{/cyan-fg}{/bold} ',
//   tags: true,
//   draggable: true,
//   top: 0,
//   right: 0,
//   width: 100,
//   height: '50%',
//   keys: true,
//   vi: true,
//   mouse: true,
//   border: 'line',
//   scrollbar: {
//     ch: ' ',
//     track: {
//       bg: 'cyan'
//     },
//     style: {
//       inverse: true
//     }
//   },
//   style: {
//     item: {
//       hover: {
//         bg: 'blue'
//       }
//     },
//     selected: {
//       bg: 'blue',
//       bold: true
//     }
//   },
//   // search: function (callback) {
//   //     prompt.input('Search:', '', function (err, value) {
//   //         if (err) return;
//   //         return callback(null, value);
//   //     });
//   // }
// });

const cmdlist = new CommandList(screen);
cmdlist.create(cmdlist.commands);

// list.items.forEach(function (item, i) {
//     var text = item.getText();
//     item.setHover(map[text]);
// });

// list.focus();
// list.enterSelected(0);

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
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

screen.render()
