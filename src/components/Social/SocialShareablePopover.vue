<template>
  <div class="d-inline">
    <el-popover :title="popoverTitle" :placement="placement">

      <ShareableButtons
          :url="url"
          :title="title"
          :description="description"
          :quote="quote"
          :hashtags="hashtags"
          :twitter-user="twitterUser"
          :media="media"
          :event-category="eventCategory"
      ></ShareableButtons>

      <base-button slot="reference" :size="buttonSize" :type="buttonType">
        <i v-if="buttonIcon" :class="buttonIcon"></i> {{ buttonText }}
      </base-button>
    </el-popover>
  </div>
</template>

<script>
  import ShareableButtons from './ShareableButtons';

  export default {
    name: 'SocialShareablePopover',

    props: {
      'popoverTitle': {
        type: String,
        default: 'Share!'
      },
      'placement': {
        type: String,
        default: 'bottom'
      },
      'url': {
        type: String,
        required: true
      },
      'title': {
        type: String,
        required: true
      },
      'description': {
        type: String,
        required: true
      },
      'quote': {
        type: String,
        required: true
      },
      'hashtags': {
        type: String,
        required: true
      },
      'twitterUser': {
        type: String,
        required: true
      },
      'media': {
        type: String,
        required: true
      },
      'eventCategory': {
        type: String,
        required: true
      },
      'buttonSize': {
        type: String,
        default: 'sm'
      },
      'buttonType': {
        type: String,
        default: 'default'
      },
      'buttonText': {
        type: String,
        default: 'Share'
      },
      'buttonIcon': {
        type: String,
        default: ''
      }
    },

    components: {
      ShareableButtons
    }
  }
</script>

<style>

</style>
