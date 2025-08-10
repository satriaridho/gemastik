import { useRef, useCallback, useState } from 'react';

interface Detection {
  bbox: [number, number, number, number];
  class: string;
  confidence: number;
  class_id: number;
}

interface DetectionResult {
  detections: Detection[];
  total_objects: number;
  timestamp?: number;
}

interface UseVideoDetectionOptions {
  endpoint?: string;
  intervalMs?: number;
  confidenceThreshold?: number;
}

export const useVideoDetection = (options: UseVideoDetectionOptions = {}) => {
  const {
    endpoint = 'http://localhost:5001/detect-video-frame',
    intervalMs = 500, // Detect every 500ms for performance
    confidenceThreshold = 0.76
  } = options;

  const [detections, setDetections] = useState<Detection[]>([]);
  const [isDetecting, setIsDetecting] = useState(false);
  const [totalObjects, setTotalObjects] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const captureFrame = useCallback((video: HTMLVideoElement): string | null => {
    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      return null;
    }

    // Create canvas if not exists
    if (!canvasRef.current) {
      canvasRef.current = document.createElement('canvas');
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to base64
    return canvas.toDataURL('image/jpeg', 0.8);
  }, []);

  const detectFrame = useCallback(async (frameData: string): Promise<DetectionResult | null> => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frame: frameData,
          timestamp: Date.now()
        })
      });

      if (!response.ok) {
        throw new Error(`Detection failed: ${response.statusText}`);
      }

      const result: DetectionResult = await response.json();

      // Filter by confidence threshold
      const filteredDetections = result.detections.filter(
        detection => detection.confidence >= confidenceThreshold
      );

      return {
        ...result,
        detections: filteredDetections,
        total_objects: filteredDetections.length
      };
    } catch (err) {
      console.error('Detection error:', err);
      return null;
    }
  }, [endpoint, confidenceThreshold]);

  const startDetection = useCallback((videoElement: HTMLVideoElement) => {
    if (isDetecting) return;

    setIsDetecting(true);
    setError(null);

    intervalRef.current = setInterval(async () => {
      try {
        const frameData = captureFrame(videoElement);
        if (!frameData) return;

        const result = await detectFrame(frameData);
        if (result) {
          setDetections(result.detections);
          setTotalObjects(result.total_objects);
          setError(null);
        }
      } catch (err) {
        console.error('Detection loop error:', err);
        setError(err instanceof Error ? err.message : 'Detection failed');
      }
    }, intervalMs);
  }, [isDetecting, captureFrame, detectFrame, intervalMs]);

  const stopDetection = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsDetecting(false);
    setDetections([]);
    setTotalObjects(0);
    setError(null);
  }, []);

  return {
    detections,
    totalObjects,
    isDetecting,
    error,
    startDetection,
    stopDetection
  };
};
