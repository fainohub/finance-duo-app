<template>
  <div class="form-group">
    <slot name="label">
      <label v-if="label" :class="labelClasses">
        {{label}}
      </label>
      <el-tooltip v-if="tooltip" :content="tooltip" placement="right">
        <i class="fas fa-info-circle" style="margin-left: 10px"></i>
      </el-tooltip>
    </slot>
    <el-select class="select-danger"
               placeholder="Product"
               name="studio_template_id"
               v-model="listing.studio_template_id"
               :error="getError('studio_template_id')"
               :valid="isValid('studio_template_id')"
    >
      <el-option v-for="option in selects.products"
                 class="select-danger"
                 :value="option.value"
                 :label="option.label"
                 :key="option.label">
      </el-option>
    </el-select>
  </div>
</template>
<script>
  import { Select, Option } from 'element-ui'

  export default {
    inheritAttrs: false,
    name: "base-select",
    components: {
      [Select.name]: Select,
      [Option.name]: Option,
    },
    props: {
      required: {
        type: Boolean,
        description: "Whether input is required (adds an asterix *)"
      },
      valid: {
        type: Boolean,
        description: "Whether is valid",
        default: undefined
      },
      label: {
        type: String,
        description: "Input label (text before input)"
      },
      tooltip: {
        type: String,
        description: "Tooltip"
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
      labelClasses: {
        type: String,
        description: "Input label css classes",
        default: "form-control-label"
      }
    },
    data() {
      return {
        focused: false
      };
    },
    computed: {

    },
    methods: {
    }
  };
</script>
<style>
</style>
