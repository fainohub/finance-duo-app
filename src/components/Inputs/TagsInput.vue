<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{label}}
      </label>
      <el-tooltip v-if="tooltip" :content="tooltip" placement="bottom">
        <i class="fas fa-info-circle" style="margin-left: 10px"></i>
      </el-tooltip>
    </slot>
    <div v-bind:class="[error ? 'tags-input__wrapper is-invalid' : 'tags-input__wrapper', 'tags-input__wrapper']">
      <el-tag
              v-for="(tag, index) in dynamicTags"
              :key="tag + index"
              size="small"
              :type="tagType"
              :closable="true"
              :close-transition="false"
              @close="handleClose(tag)"
      >
        {{ tag }}
      </el-tag>

      <br>

      <div class="input-group" style="margin: 5px">
        <div class="input-group-prepend">
          <input
                  type="text"
                  placeholder="Add new tag"
                  class="form-control"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="mini"
                  @input="onInput"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                  :disabled="(maxTags - dynamicTags.length) === 0"
          />
          <div class="input-group-append">
            <span class="input-group-text" style="border: 1px">{{ maxTags - dynamicTags.length }} available tags</span>
          </div>
        </div>
      </div>

    </div>
    <slot name="error">
      <div v-if="error" class="invalid-feedback" style="display: block;">
        {{ error }}
      </div>
    </slot>
    <slot name="success">
      <div class="valid-feedback" v-if="!error && valid">
        {{successMessage}}
      </div>
    </slot>
  </div>
</template>

<script>
import { Tag } from 'element-ui';

export default {
  name: 'tags-input',
  components: {
    [Tag.name]: Tag
  },
  props: {
    value: {
      type: Array,
      default: () => [],
      description: 'List of tags'
    },
    tagType: {
      type: String,
      default: 'primary',
      description: 'Tag type (primary|danger etc)'
    },
    label: {
      type: String,
      description: "Input label (text before input)"
    },
    tooltip: {
      type: String,
      description: "Tooltip"
    },
    labelClasses: {
      type: String,
      description: "Input label css classes",
      default: "form-control-label"
    },
    error: {
      type: String,
      description: "Input error (below input)"
    },
    successMessage: {
      type: String,
      description: "Input success message",
      default: 'Looks good!'
    },
    valid: {
      type: Boolean,
      description: "Whether is valid",
      default: undefined
    },
    maxTags: {
      default: 13
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: ''
    };
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      this.$emit('change', this.dynamicTags);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.dynamicTags.length < this.maxTags ) {
        let inputValue = this.inputValue;

        if (inputValue) {
          let tagsArray = inputValue.split(',');

          for (let i = 0; i < tagsArray.length; i++) {
            if (this.dynamicTags.length < this.maxTags ) {
              this.dynamicTags.push(tagsArray[i]);
            }
          }

          this.$emit('change', this.dynamicTags);
        }
        this.inputVisible = false;
        this.inputValue = '';
      }
    },
    onInput(evt) {
      this.$emit('input', evt.target.value);
    }
  },
  created() {
    this.$watch(
      'value',
      newVal => {
        this.dynamicTags = [...newVal];
      },
      { immediate: true }
    );
  }
};
</script>
