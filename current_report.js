const _p = require('path').join(require('os').homedir(), '.local/share/TeleAgent/runtimes/node/lib/node_modules');
module.paths.unshift(_p);
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        ImageRun, Header, Footer, AlignmentType, LevelFormat, ExternalHyperlink,
        HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
        VerticalAlign, TableOfContents } = require('docx');
const fs = require('fs');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Microsoft YaHei", size: 24 }, paragraph: { spacing: { line: 360 } } } }
  },
  numbering: {
    config: [

    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `账外工程整改工作周通报`, italics: true, size: 18, color: "999999"})] })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: `第 ` }), new TextRun({ children: [PageNumber.CURRENT] }), new TextRun({ text: ` 页` })]
      })] })
    },
    children: [
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        outlineLevel: 0,
        spacing: { before: 240, after: 240 },
        children: [new TextRun({ text: `账外工程整改工作周通报`, bold: true, size: 32, color: "1A5276", font: "Microsoft YaHei" })]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`（2026年8月7日—8月13日）`)]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        outlineLevel: 1,
        spacing: { before: 180, after: 180 },
        children: [new TextRun({ text: `一、整体情况`, bold: true, size: 28, color: "1A5276", font: "Microsoft YaHei" })]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`截至8月13日，全省账外工程整改指标共 1122 个（账外预告警站点 412 个、疑似已账外且未立项站点 710 个），较8月7日（整改指标 1528 个）一周内压降 406 个，降幅 26.6%。较7月31日（整改指标 2273 个）累计压降 1151 个，累计降幅 50.6%。其中：`)]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`账外预告警站点：499 个 → 412 个，压降 87 个（-17.4%）。`)]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`疑似已账外且未立项站点：1029 个 → 710 个，压降 319 个（-31.0%）。`)]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`另有已账外且已立项站点 1306 个为既定事实，不再纳入整改范围。各分公司整改工作总体推进有力，整改完成率明显提升，但仍有个别分公司指标不降反升，需重点关注。`)]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        outlineLevel: 1,
        spacing: { before: 180, after: 180 },
        children: [new TextRun({ text: `二、分公司整改成效排名`, bold: true, size: 28, color: "1A5276", font: "Microsoft YaHei" })]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`整改成效较好的前三名：`)]
      }),
      new Table({
        width: { size: 9025, type: WidthType.DXA },
        columnWidths: [1805, 1805, 1805, 1805, 1805],
        alignment: AlignmentType.CENTER,
        rows: [
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `排名`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `分公司`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月7日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月13日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `周压降`, bold: true })] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`1`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`襄阳`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`281`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`115`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-166`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`2`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`十堰`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`94`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`13`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-81`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`3`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`宜昌`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`83`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`9`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-74`)] })]
          })
          ]
        })
        ]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`整改推进较慢的后三名分公司：`)]
      }),
      new Table({
        width: { size: 9025, type: WidthType.DXA },
        columnWidths: [1805, 1805, 1805, 1805, 1805],
        alignment: AlignmentType.CENTER,
        rows: [
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `排名`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `分公司`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月7日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月13日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `周变化`, bold: true })] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`倒数1`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`荆州`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`223`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`268`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+45`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`倒数2`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`武汉`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`137`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`141`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+4`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`倒数3`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`咸宁`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`1`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`5`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+4`)] })]
          })
          ]
        })
        ]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`各分公司整改指标变化明细`)]
      }),
      new Table({
        width: { size: 9024, type: WidthType.DXA },
        columnWidths: [2256, 2256, 2256, 2256],
        alignment: AlignmentType.CENTER,
        rows: [
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `分公司`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月7日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月13日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `周变化`, bold: true })] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`襄阳`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`281`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`115`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-166`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`十堰`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`94`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`13`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-81`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`宜昌`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`83`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`9`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-74`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`恩施`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`197`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`139`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-58`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`仙桃`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`51`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`6`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-45`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`孝感`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`46`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`21`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-25`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`黄冈`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`13`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`3`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-10`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`随州`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`35`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`35`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`荆门`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`5`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`5`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`黄石`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`162`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`162`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`天门`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`86`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`86`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`潜江`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`90`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`90`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`神农架`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`19`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`19`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`0`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`咸宁`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`1`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`5`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+4`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`武汉`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`137`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`141`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+4`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`荆州`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`223`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`268`)] })]
          }),
          new TableCell({
            width: { size: 2256, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`+45`)] })]
          })
          ]
        })
        ]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`> 注：整改指标 = 账外预告警站点数 + 疑似已账外且未立项站点数。荆州、武汉、咸宁指标不降反升，需重点督办。`)]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        outlineLevel: 1,
        spacing: { before: 180, after: 180 },
        children: [new TextRun({ text: `三、重点专业整改情况`, bold: true, size: 28, color: "1A5276", font: "Microsoft YaHei" })]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`FTTH/宽带接入为整改重点专业，整改指标占比超九成，是本周整改成效的主要来源。`)]
      }),
      new Table({
        width: { size: 9025, type: WidthType.DXA },
        columnWidths: [1805, 1805, 1805, 1805, 1805],
        alignment: AlignmentType.CENTER,
        rows: [
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `专业`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `指标项`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月7日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `8月13日`, bold: true })] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `周压降`, bold: true })] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`FTTH/宽带接入`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`账外预告警`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`469`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`389`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-80`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`FTTH/宽带接入`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`疑似已账外且未立项`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`844`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`520`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-324`)] })]
          })
          ]
        }),
        new TableRow({
          children: [
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`FTTH/宽带接入合计`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`1313`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`909`)] })]
          }),
          new TableCell({
            width: { size: 1805, type: WidthType.DXA },
            borders: cellBorders,
            verticalAlign: VerticalAlign.CENTER,
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun(`-404`)] })]
          })
          ]
        })
        ]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`FTTH/宽带接入专业周压降 404 个，占全省总压降量（406 个）的 99.5%，其中疑似已账外且未立项站点压降 324 个，推进力度最大。政企专线、无线网、应急/批量工程等专业整改指标基数较小，需同步关注整改进度，防止账外问题向其他专业蔓延。`)]
      }),
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        outlineLevel: 1,
        spacing: { before: 180, after: 180 },
        children: [new TextRun({ text: `四、下一步工作要求`, bold: true, size: 28, color: "1A5276", font: "Microsoft YaHei" })]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`荆州、武汉、咸宁分公司要查明整改指标不降反升的原因，倒排工期，逐站销号，确保整改指标持续压降。`)]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`已账外且已立项站点为既定事实，各分公司要举一反三，从源头规范"先立项、后施工"流程，杜绝新增账外工程。`)]
      }),
      new Paragraph({
        indent: { firstLine: 480 },
        children: [new TextRun(`各分公司要对照剩余整改清单，于8月20日前完成整改销号，确保月底账外工程整改目标全面达成。`)]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => fs.writeFileSync("D:/工作/周报/账外数据/.temp/report_output.docx", buffer));
