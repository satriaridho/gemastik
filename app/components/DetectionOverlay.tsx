import React from 'react';

interface Detection {
  bbox: [number, number, number, number];
  class: string;
  confidence: number;
  class_id: number;
}

interface DetectionOverlayProps {
  detections: Detection[];
  videoWidth: number;
  videoHeight: number;
  containerWidth: number;
  containerHeight: number;
}

const DetectionOverlay: React.FC<DetectionOverlayProps> = ({
  detections,
  videoWidth,
  videoHeight,
  containerWidth,
  containerHeight
}) => {
  // Calculate scaling factors
  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;

  // Color mapping for different classes
  const getClassColor = (classId: number) => {
    const colors = [
      '#ff6b6b', // Red
      '#4ecdc4', // Teal
      '#45b7d1', // Blue
      '#f9ca24', // Yellow
      '#6c5ce7', // Purple
      '#a0e7e5', // Light teal
      '#ffeaa7', // Light yellow
      '#fd79a8', // Pink
      '#00b894', // Green
      '#e17055'  // Orange
    ];
    return colors[classId % colors.length];
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {detections.map((detection, index) => {
        const [xmin, ymin, xmax, ymax] = detection.bbox;

        // Scale coordinates to container size
        const scaledXmin = xmin * scaleX;
        const scaledYmin = ymin * scaleY;
        const scaledWidth = (xmax - xmin) * scaleX;
        const scaledHeight = (ymax - ymin) * scaleY;

        const color = getClassColor(detection.class_id);

        return (
          <div key={index}>
            {/* Bounding box */}
            <div
              className="absolute border-2 rounded"
              style={{
                left: `${scaledXmin}px`,
                top: `${scaledYmin}px`,
                width: `${scaledWidth}px`,
                height: `${scaledHeight}px`,
                borderColor: color,
                backgroundColor: `${color}20`, // 20% opacity
              }}
            />

            {/* Label */}
            <div
              className="absolute text-xs font-bold px-2 py-1 rounded text-white shadow-lg"
              style={{
                left: `${scaledXmin}px`,
                top: `${scaledYmin - 25}px`,
                backgroundColor: color,
                minWidth: '60px'
              }}
            >
              {detection.class}: {Math.round(detection.confidence * 100)}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DetectionOverlay;
