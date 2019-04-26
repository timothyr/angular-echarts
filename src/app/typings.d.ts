import {EChartOption} from 'echarts'

// Naming-convention for top-level modules:
// * Name as necessary if custom module.
// * If referencing a npm-module, suffix with "Custom".

// This declares ECharts string-literal types for string to type
// assertion, preventing type-unsafe "any" for string-literals
declare namespace EChartsCustom {
  module Axis {
    export type type = 'category' | 'value' | 'time' | 'log'
  }

  module Tooltip {
    export type trigger = 'none' | 'item' | 'axis'

    module AxisPointer {
      export type type = 'none' | 'line' | 'shadow' | 'cross'
    }
  }
}