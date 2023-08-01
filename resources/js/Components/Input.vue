<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  label: String,
  type: {
    type: String,
    default: "text",
    required: false,
  },
  size: {
    type: String,
    default: "md",
    required: false,
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  config: [Object, Boolean],
});

const emit = defineEmits(["update:modelValue"]);

const input = ref(null);

onMounted(() => {
  if (input.value.hasAttribute("autofocus")) {
    input.value.focus();
  }
});

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};

defineExpose({ focus: () => input.value.focus() });

const focusToInput = () => {
  input.value.focus();
};

const get_class = () => {
  let _class = "";
  if (props.size == "md") {
    _class = {
      input: "pb-2 pt-3 text-sm",
      label: "text-sm",
    };
  } else if (props.size == "sm") {
    _class = {
      input: "pb-1 pt-1 text-xs bg-transparent",
      label: "text-xs",
    };
  }
  if (props.disabled) {
    _class.label = _class.label + " transparent bg-gray-100 rounded-xl";
    _class.input = _class.input + " cursor-not-allowed bg-gray-100";
  }
  return _class;
};
</script>
    
    <template>
  <div class="relative mt-5">
    <input
      ref="input"
      :maxlength="props.config?.maxlength"
      :size="props.config?.maxlength"
      :type="type"
      :class="get_class().input"
      class="block px-2 w-full text-gray-900 rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
      placeholder=" "
      :value="modelValue"
      @input="updateValue"
      :disabled="disabled"
    />
    <label
      @click="focusToInput"
      :class="get_class().label"
      class="absolute cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 z-0"
    >
      {{ label }}
    </label>
  </div>
</template>
    