<script lang="ts">
  import "leaflet/dist/leaflet.css";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import MapPinIcon from "@lucide/svelte/icons/map-pin";
  import XIcon from "@lucide/svelte/icons/x";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { onDestroy } from "svelte";
  import type * as Leaflet from "leaflet";

  type LatLng = { lat: number; lng: number };

  let {
    value = $bindable<LatLng | null>(null),
    initialCenter, initialZoom = 12,
    id, name, label,
    popupHeader, popupDescription, noLocationSelectedLabel
  }: {
    value?: LatLng | null;
    initialCenter: LatLng; initialZoom?: number;
    id: string, name?: string, label: string,
    popupHeader: string, popupDescription: string, noLocationSelectedLabel: string
  } = $props();

  let open = $state(false);
  let pending = $state<LatLng | null>(null);

  let mapContainer: HTMLDivElement | undefined;
  let map: Leaflet.Map | null = null;
  let marker: Leaflet.Marker | null = null;
  let L: typeof Leaflet | null = null;

  async function ensureLeaflet() {
    if (!L) {
      L = (await import("leaflet")).default;
      // Bundlers (Vite included) break Leaflet's default marker icon URLs.
      // Point them at a CDN instead of shipping the icon assets yourself.
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
      });
    }
    return L;
  }

  function placeMarker(latlng: LatLng) {
    if (!map || !L) return;
    pending = latlng;
    if (marker) {
      marker.setLatLng([latlng.lat, latlng.lng]);
    } else {
      marker = L.marker([latlng.lat, latlng.lng]).addTo(map);
    }
  }

  async function initMap() {
    if (!mapContainer || map) return;
    const leaflet = await ensureLeaflet();

    const center = value ?? initialCenter;
    map = leaflet.map(mapContainer).setView([center.lat, center.lng], initialZoom);

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
      })
      .addTo(map);

    if (value) placeMarker(value);

    map.on("click", (e: Leaflet.LeafletMouseEvent) => {
      placeMarker({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    // Dialogs animate in, so the container has the wrong size at mount time.
    requestAnimationFrame(() => {
      setTimeout(() => map?.invalidateSize(), 60);
    });
  }

  function destroyMap() {
    map?.remove();
    map = null;
    marker = null;
  }

  // React to the dialog opening/closing rather than component mount,
  // since the map div only exists while the dialog is in the DOM.
  $effect(() => {
    if (open) {
      pending = value ? { ...value } : null;
      requestAnimationFrame(() => initMap());
    } else {
      destroyMap();
    }
  });

  onDestroy(destroyMap);

  function confirm() {
    if (pending) value = { ...pending };
    open = false;
  }

  function cancel() {
    open = false;
  }
</script>

<div class="flex flex-col gap-2">
    <Label class="ml-1" for="{id}-input">{label}</Label>
    {#if name && value}
        <input type="hidden" name="{name}-lat" value={value.lat} />
        <input type="hidden" name="{name}-lng" value={value.lng} />
    {/if}
    <Button variant="outline" onclick={() => (open = true)}>
    {#if value}
       [ {value.lat.toFixed(5)} , {value.lng.toFixed(5)} ]
    {:else}
        <MapPinIcon/>
    {/if}
    </Button>
</div>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-2xl">
    <Dialog.Header>
      <Dialog.Title>{popupHeader}</Dialog.Title>
      <Dialog.Description>{popupDescription}</Dialog.Description>
    </Dialog.Header>

    <div bind:this={mapContainer} class="h-96 w-full overflow-hidden rounded-md border"></div>

    <p class="text-sm text-muted-foreground flex items-center">
      <MapPinIcon class="mr-3"/>
      {#if pending}
         {pending.lat.toFixed(6)}, {pending.lng.toFixed(6)}
      {:else}
        { noLocationSelectedLabel } 
      {/if}
    </p>

    <Dialog.Footer>
      <Button variant="ghost" onclick={cancel} class="w-20"><XIcon/></Button>
      <Button onclick={confirm} disabled={!pending} class="w-20"><CheckIcon/></Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>