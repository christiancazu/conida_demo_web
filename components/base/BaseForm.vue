<template>
<el-form
  ref="form"
  :model="$parent.form"
  :rules="$parent.rules"
  label-position="top"
  label-width="120px"
>
  <slot />

  <div class="form-btn-actions">
    <el-button
      v-if="$parent.mountedAsDynamic"
      size="small"
      @click="$parent.$_mountableAsDynamic_closeDialog"
    >
      CERRAR
    </el-button>
    <el-button
      type="success"
      size="small"
      native-type="submit"
      :loading="$store.state.spinners.processingForm"
      @click.prevent="submitForm"
    >
      GUARDAR
    </el-button>
  </div>
</el-form>
</template>

<script>
import $_use_objectToFormData from '@/use/objectToFormData'

import {
  $_notify_success,
  $_notify_error
} from '@/use/notifications'

import {
  SUCCESS,
  ERRORS
} from '@/config/messages'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/store/mutations.types'

export default {
  methods: {
    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

        const formData = $_use_objectToFormData(this.$parent.form)

        // parent submit context
        const { storeName, storeAction, notifyType } = this.$parent.submit

        // used when need to apply custom functionality/fix on formData before to be sends
        this.$emit('apply-before-submit-form', formData)
        try {
          await this.$store.dispatch(`${storeName}/${storeAction}`, formData)

          if (storeAction === 'createItemContext') this.resetForm()

          $_notify_success(SUCCESS[notifyType])

          //  await this.getDataContext()

          // used when need to apply custom functionality/fix on formData after to be sends
          this.$emit('apply-after-submit-form')
        }
        catch (e) {
        }
        this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')

      } else {
        $_notify_error(ERRORS.INVALID_DATA)
      }
    }
  }
}
</script>
