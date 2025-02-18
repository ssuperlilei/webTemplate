<script lang="tsx">
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import { isArray, isFunction, isString } from '@ll_lib/utils';
import { Tooltip } from 'ant-design-vue';
import { type CSSProperties, type PropType, defineComponent } from 'vue';
import { getSlot } from '../utils/tsxHelper';
import type { JSX } from 'vue/jsx-runtime';

const props = {
  /**
   * Help text max-width
   * @default: 600px
   */
  maxWidth: { type: String, default: '600px' },
  /**
   * Whether to display the serial number
   * @default: false
   */
  showIndex: { type: Boolean, default: false },
  /**
   * Help text font color
   * @default: #ffffff
   */
  color: { type: String, default: '#ffffff' },
  /**
   * Help text font size
   * @default: 14px
   */
  fontSize: { type: String, default: '14px' },
  /**
   * Help text list
   */
  placement: { type: String, default: 'right' },
  /**
   * Help text list
   */
  text: {
    type: [Array, String, Object] as PropType<string[] | string | JSX.Element>,
  },
};

export default defineComponent({
  name: 'BasicHelp',
  components: { Tooltip },
  props,
  computed: {
    getTooltipStyle(): CSSProperties {
      return { color: this.color, fontSize: this.fontSize };
    },
    getOverlayStyle(): CSSProperties {
      return { maxWidth: this.maxWidth };
    },
  },
  methods: {
    renderTitle() {
      const textList = this.text;

      if (isString(textList)) {
        return <p>{textList}</p>;
      }

      if (isArray(textList)) {
        return textList.map((text, index) => {
          return (
            <p key={text}>
              <>
                {this.showIndex ? `${index + 1}. ` : ''}
                {text}
              </>
            </p>
          );
        });
      }
      if (isFunction(textList)) {
        return textList();
      }
      return null;
    },
  },
  render() {
    return (
      <Tooltip
        overlayClassName="basic-help__wrap"
        title={<div style={this.getTooltipStyle}>{this.renderTitle()}</div>}
        autoAdjustOverflow={true}
        overlayStyle={this.getOverlayStyle}
        placement={this.placement as 'right'}
      >
        <span class="basic-help">{getSlot(this.$slots) || <InfoCircleOutlined />}</span>
      </Tooltip>
    );
  },
});
</script>
