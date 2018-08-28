// @flow

// TODO there is probably a better way to make autoresizing work
//$FlowFixMe$
import jquery from '!raw-loader!jquery'

export default `
${jquery}

$(document)
  .on('focus.autoExpand', 'textarea.autoExpand', function(){
      this.savedValue = this.value;
      this.value = '';
      this.baseScrollHeight = this.scrollHeight;
      this.value = this.savedValue;
  })
  .on('input.autoExpand', 'textarea.autoExpand', function(){
      var minRows = parseInt(this.getAttribute('data-min-rows'));
      this.rows = minRows;
      var rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
      this.rows = minRows + rows;
  });
`
