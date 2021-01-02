<template>
  <div></div>
</template>

<script>
export default {
  name: 'product-designer',
  props: {
    productTypeId: {
      type: Number
    },
    artSource: {
      type: String
    },
    printFile: {
      type: Object
    },
    template: {
      type: Object
    }
  },
  data() {
    return {
      backgroundImage: {
        type: "image",
        source: this.template.background_url,
        title: "Background",
        parameters: {
          fill: false,
          autoCenter: true,
          removable: false,
          draggable: false,
          rotatable: false,
          resizable: false,
          locked: true
        }
      },
      artImage: {
        type: "image",
        source: this.artSource,
        title: "Art",
        parameters: {
          scaleX: (1 / (this.printFile.width / this.template.print_area_width)),
          scaleY: (1 / (this.printFile.height / this.template.print_area_height)),
          autoCenter: true,
          removable: false,
          draggable: true,
          rotatable: false,
          resizable: true,
          locked: false,
          boundingBox: {
            width: this.template.print_area_width,
            height: this.template.print_area_height,
            y: this.template.print_area_top,
            x: this.template.print_area_left
          }
        }
      },
      templateImage: {
        type: "image",
        source: this.template.image_url,
        title: "Base",
        parameters: {
          fill: false,
          autoCenter: true,
          removable: true,
          draggable: true,
          rotatable: false,
          resizable: true,
          locked: true
        }
      },
      elements: [],
      designer: null
    }
  },
  methods: {
    createDesigner: function() {
      if (this.template.background_url !== null) {
        this.elements.push(this.backgroundImage);
      }

      if (this.template.is_template_on_front === true) {
        this.elements.push(this.artImage);
        this.elements.push(this.templateImage);
      } else {
        this.elements.push(this.templateImage);
        this.elements.push(this.artImage);
      }

      this.designer = new FancyProductDesigner($(this.$el), {
        templatesDirectory: '/fancy/html/',
        productsJSON: [[{elements: this.elements}]],
        langJSON: '/fancy/lang/default.json',
        stageWidth: this.template.template_width,
        stageHeight: this.template.template_height,
        smartGuides: true,
        mainBarModules: [],
        responsive: true
      });
    },

    getProduct: function() {
      let object = this.designer.getElementByTitle('Art');

      let imageWidth = object.width * object.scaleX;
      let imageHeight = object.height * object.scaleY;

      let scaleWidth = (this.printFile.width / this.template.print_area_width);
      let scaleHeight = (this.printFile.height / this.template.print_area_height);

      return {
        product_type_id: this.productTypeId,
        acceptImage: this.acceptImage,
        parameters: {
          angle: object.angle,
          flipX: object.flipX,
          flipY: object.flipY,
          left: Math.round(object.left * scaleWidth),
          top: Math.round(object.top * scaleWidth),
          imageWidth: Math.round(imageWidth),
          imageHeight: Math.round(imageHeight),
          width: Math.round(imageWidth * scaleWidth),
          height: Math.round(imageHeight * scaleHeight),
          centerWidth: Math.round((imageWidth * scaleWidth) / 2),
          centerHeight: Math.round((imageHeight * scaleHeight) / 2),
          canvasWidth: Math.round(this.template.template_width * scaleWidth),
          canvasHeight: Math.round(this.template.template_height * scaleHeight),
          cropTop: Math.round(this.template.print_area_top * scaleHeight),
          cropLeft: Math.round(this.template.print_area_left * scaleWidth),
          cropWidth: Math.round(this.template.print_area_width * scaleWidth),
          cropHeight: Math.round(this.template.print_area_height * scaleHeight)
        }
      }
    }
  },
  mounted() {
    this.createDesigner();
  }
};
</script>
<style></style>
