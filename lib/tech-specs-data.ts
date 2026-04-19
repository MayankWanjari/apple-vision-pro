export type SpecRow = {
  label: string;
  value: string | string[];
};

export type SpecSection = {
  id: string;
  title: string;
  rows: SpecRow[];
};

export const TECH_SPECS: SpecSection[] = [
  {
    id: 'display',
    title: 'Display',
    rows: [
      { label: 'Type', value: 'Micro-OLED' },
      { label: 'Resolution', value: '23 million pixels' },
      { label: 'Per-eye resolution', value: '3660 × 3200' },
      { label: 'Pixel density', value: '3386 pixels per inch' },
      { label: 'Refresh rates', value: ['90Hz', '96Hz', '100Hz'] },
      { label: 'Color', value: 'Wide color (P3)' },
      { label: 'HDR', value: 'Support for Dolby Vision and HDR10' },
    ],
  },
  {
    id: 'chips',
    title: 'Chips',
    rows: [
      { label: 'Apple M2', value: '8-core CPU with 4 performance cores and 4 efficiency cores' },
      { label: 'GPU', value: '10-core GPU' },
      { label: 'Neural Engine', value: '16-core Neural Engine' },
      { label: 'Memory', value: '16GB unified memory' },
      { label: 'Apple R1', value: 'Dedicated chip for real-time sensor processing' },
    ],
  },
  {
    id: 'sensors',
    title: 'Sensors',
    rows: [
      { label: 'Cameras', value: '2 high-resolution main cameras' },
      { label: 'Tracking cameras', value: '6 world-facing tracking cameras' },
      { label: 'TrueDepth', value: '4 eye-tracking cameras with IR flood illuminators' },
      { label: 'Depth sensor', value: 'LiDAR Scanner' },
      { label: 'IMU', value: 'TrueDepth camera, LiDAR Scanner, accelerometer, gyroscope, magnetometer' },
      { label: 'Ambient light sensor', value: 'Flicker sensor included' },
    ],
  },
  {
    id: 'audio',
    title: 'Audio',
    rows: [
      { label: 'Speakers', value: 'Dual-driver audio pods next to each ear' },
      { label: 'Spatial Audio', value: 'With dynamic head tracking' },
      { label: 'Audio Ray Tracing', value: 'Personalized sound that adapts to your room' },
      { label: 'Microphones', value: 'Six-mic array with directional beamforming' },
    ],
  },
  {
    id: 'battery',
    title: 'Battery',
    rows: [
      { label: 'Type', value: 'External rechargeable battery' },
      { label: 'Capacity', value: '3166 mAh' },
      { label: 'Battery life', value: ['Up to 2 hours general use', 'Up to 2.5 hours video playback'] },
      { label: 'Charging', value: 'Supported with included USB-C Charge Cable and 30W power adapter' },
      { label: 'All-day use', value: 'When plugged in' },
    ],
  },
  {
    id: 'connectivity',
    title: 'Connectivity',
    rows: [
      { label: 'Wi-Fi', value: 'Wi-Fi 6 (802.11ax)' },
      { label: 'Bluetooth', value: 'Bluetooth 5.3' },
    ],
  },
  {
    id: 'in-the-box',
    title: 'In the Box',
    rows: [
      { label: 'Apple Vision Pro', value: 'With Light Seal, Light Seal Cushion, and Solo Knit Band' },
      { label: 'Dual Loop Band', value: 'Additional band included' },
      { label: 'Cover', value: 'For front of device' },
      { label: 'Polishing Cloth', value: 'For cleaning external surfaces' },
      { label: 'Battery', value: 'External rechargeable battery' },
      { label: 'USB-C Charge Cable', value: '1.5m braided cable' },
      { label: 'USB-C Power Adapter', value: '30W' },
      { label: 'Documentation', value: 'Quick Start guide' },
    ],
  },
  {
    id: 'dimensions',
    title: 'Size and Weight',
    rows: [
      { label: 'Height', value: '11.8 cm' },
      { label: 'Width', value: '17.8 cm' },
      { label: 'Depth', value: '9.95 cm' },
      { label: 'Weight', value: '600-650 grams (varies by Light Seal and band)' },
      { label: 'Battery weight', value: '353 grams' },
    ],
  },
];
