import type { DrinksStore } from '@store/drinks';
import type { ComputedRef, Ref } from 'vue';

import messages from '@config/messages';
import photoConfig from '@config/photo-config';
import { computed, onUnmounted, ref } from 'vue';
import { useToast } from 'vue-toastification';

import { useDrinksStore } from '@/store';

interface ImageData {
  src?: string;
  type?: string;
}

interface Size {
  height: number;
  width: number;
}

interface CropperData {
  canvas: HTMLCanvasElement;
  coordinates: Size;
}

export function useAddPhoto(drinkId: number, file: Ref<HTMLInputElement | null>) {
  // setup
  const drinksStore: DrinksStore = useDrinksStore();
  const toast: ReturnType<typeof useToast> = useToast();

  // state
  const loading: Ref<boolean> = ref(false);
  const photoData: Ref<string> = ref('');
  const showed: Ref<boolean> = ref(false);
  const image: Ref<ImageData> = ref({});
  const cropSize: Ref<Size> = ref({ height: 0, width: 0 });

  // computed
  const cropAvailable: ComputedRef<boolean> = computed(() => {
    return (
      !!image.value.src &&
      photoData.value !== '' &&
      cropSize.value.width >= photoConfig.minUpload.width &&
      cropSize.value.height >= photoConfig.minUpload.height
    );
  });

  // lifecycle
  onUnmounted(revoke);

  // actions
  async function upload(): Promise<void> {
    if (!cropAvailable.value) {
      return;
    }
    loading.value = true;
    const success: boolean = await drinksStore.addPhoto(drinkId, photoData.value);

    if (!success) {
      loading.value = false;
      toast.error(messages.invalidData);

      return;
    }

    toast.success(messages.photoAdded);
    reset();
    showed.value = false;
  }

  function change(data: CropperData): void {
    cropSize.value = { height: data.coordinates.height, width: data.coordinates.width };
    photoData.value = data.canvas.toDataURL();
  }

  function reset(): void {
    loading.value = false;
    revoke();
    image.value = {};
    photoData.value = '';
  }

  function revoke(): void {
    if (image.value.src) {
      URL.revokeObjectURL(image.value.src);
    }
  }

  function onFileChange(event: Event): void {
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const { files } = input;

    if (!files || !files[0]) {
      return;
    }

    const file: File = files[0];

    const img: HTMLImageElement = new Image();
    const blob: string = URL.createObjectURL(files[0]);

    img.onload = (): void => {
      if (img.width < photoConfig.minUpload.width || img.height < photoConfig.minUpload.height) {
        toast.error(messages.invalidPhotoDimensions);
        URL.revokeObjectURL(blob);

        return;
      }
      revoke();
      image.value = { src: blob, type: file.type };
    };

    img.src = blob;
  }

  function open(): void {
    showed.value = true;
    if (file.value) {
      file.value.value = '';
    }
    reset();
  }

  function hideModal(): void {
    showed.value = false;
  }

  return { change, cropAvailable, hideModal, image, loading, onFileChange, open, showed, upload };
}
