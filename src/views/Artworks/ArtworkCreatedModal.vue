<template>
  <div>
    <modal class="card" :show.sync="show">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel"></h5>
      </template>
      <div class="card-body">
        <img src="img/catalog/rocket.png"
             class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
             style="width: 140px;">
        <div class="pt-4 text-center">
          <h5 class="h3 title">
            <span class="d-block mb-2">You're all set!</span>
            <span class="d-block mb-4">Your listing will be reviewed soon by our team!</span>
          </h5>
          
          <h5 class="h3 title">
            <small class="h4 font-weight-light text-muted">
              Share your studio and show the world your creativity:
            </small>
          </h5>
          
          <div v-if="user.studioUrl" class="mt-3" style="margin-left: 70px">
            <ShareableButtons
                    :url="user.studioUrl"
                    title="Check it out my amazing artworks in ArtishUp products!"
                    description="Check it out my amazing artworks in ArtishUp products!"
                    quote="Check it out my amazing artworks in ArtishUp products!"
                    hashtags="artishup"
                    twitter-user="artishup"
                    :media="user.avatar"
                    event-category="shareArtworkCreatedClick"
            ></ShareableButtons>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import ShareableButtons from './../../components/Social/ShareableButtons';
  import { StorageService } from '../../services/storage.service';

  export default {
    name: 'ArtworkCreatedModal',
    
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    
    components: {
      ShareableButtons
    },
    
    data() {
      return {
        user: {
          firstName: '',
          lastName: '',
          email: '',
          avatar: null,
          studioName: '',
          studioUrl: null
        }
      }
    },
    
    mounted() {
      this.user = StorageService.getUser();
    },
    
    methods: {
      closeModal() {
        this.show = !this.show;
      }
    }
  };
</script>

<style>

</style>
