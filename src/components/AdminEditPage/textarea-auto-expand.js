// @flow

// TODO there is probably a better way to make autoresizing work
//$FlowFixMe$
import jquery from '!raw-loader!jquery'
//$FlowFixMe$
import autosize from '!raw-loader!autosize'

export default `
${jquery}
${autosize}

autosize($('textarea.autoExpand'));
`
