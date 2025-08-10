"use client";
import Sidebar from "../section/Sidebar";
import { useEffect, useRef, useState } from "react";
import { useVideoDetection } from "../hooks/useVideoDetection";
import DetectionOverlay from "../components/DetectionOverlay";

export default function AnalisisPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoInserted, setIsVideoInserted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [enableDetection, setEnableDetection] = useState(false);
  const [videoMetadata, setVideoMetadata] = useState({ width: 0, height: 0 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Use video detection hook
  const {
    detections,
    totalObjects,
    isDetecting,
    error: detectionError,
    startDetection,
    stopDetection
  } = useVideoDetection({
    intervalMs: 300, // Detect every 300ms for better performance
    confidenceThreshold: 0.76
  });

  const handleInsertVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Stop any ongoing detection
    stopDetection();

    // Revoke previous URL if any
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setIsVideoInserted(true);
    setIsVideoPlaying(true);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setVideoMetadata({
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight
      });
    }
  };

  const handleToggleDetection = () => {
    if (!videoRef.current || !isVideoInserted) return;

    if (enableDetection) {
      stopDetection();
      setEnableDetection(false);
    } else {
      startDetection(videoRef.current);
      setEnableDetection(true);
    }
  };

  const handlePause = () => {
    const next = !isVideoPlaying;
    setIsVideoPlaying(next);
    if (next) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handleReport = () => {
    const reportData = {
      detections: detections,
      totalObjects: totalObjects,
      videoMetadata: videoMetadata,
      timestamp: new Date().toISOString()
    };

    console.log('Report Data:', reportData);
    alert(`Laporan berhasil dibuat!\nTotal objek terdeteksi: ${totalObjects}`);
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopDetection();
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl, stopDetection]);

  return (
    <div className="min-h-screen bg-[#e6fae6] flex text-black">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#3a7c3a] mb-2">Analisis AI</h1>
            <p className="text-gray-600">Analisis video aerial untuk deteksi sampah</p>
          </div>

          {/* Main Content - Video Display and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Control Buttons - Left Side */}
            <div className="lg:col-span-1 space-y-4">
              <button
                onClick={handleInsertVideo}
                className="w-full bg-[#b6e6b6] border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#a3d6a3] transition-colors"
              >
                Insert Video
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={handlePause}
                disabled={!isVideoInserted}
                className="w-full bg-[#b6e6b6] border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#a3d6a3] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isVideoPlaying ? "Pause" : "Play"}
              </button>

              <button
                onClick={handleToggleDetection}
                disabled={!isVideoInserted}
                className={`w-full border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  enableDetection
                    ? "bg-red-400 hover:bg-red-300"
                    : "bg-[#b6e6b6] hover:bg-[#a3d6a3]"
                }`}
              >
                {enableDetection ? "Stop Detection" : "Start Detection"}
              </button>

              <button
                onClick={handleReport}
                className="w-full bg-[#b6e6b6] border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#a3d6a3] transition-colors"
              >
                Report
              </button>

              {/* Detection Status */}
              {isVideoInserted && (
                <div className="bg-white rounded-lg p-3 border border-[#c8eac8]">
                  <h4 className="font-semibold text-[#3a7c3a] text-sm mb-2">Detection Status</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className={`font-medium ${isDetecting ? 'text-green-600' : 'text-gray-600'}`}>
                        {isDetecting ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Objects:</span>
                      <span className="font-medium text-[#3a7c3a]">{totalObjects}</span>
                    </div>
                    {detectionError && (
                      <div className="text-red-600 text-xs mt-1">
                        Error: {detectionError}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Video Display - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-white rounded-lg overflow-hidden shadow-lg">
                {isVideoInserted && videoUrl ? (
                  <div className="relative" ref={containerRef}>
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-96 object-cover"
                      muted
                      autoPlay
                      playsInline
                      onLoadedMetadata={handleLoadedMetadata}
                    />

                    {/* Detection Overlay */}
                    {enableDetection && detections.length > 0 && containerRef.current && (
                      <DetectionOverlay
                        detections={detections}
                        videoWidth={videoMetadata.width}
                        videoHeight={videoMetadata.height}
                        containerWidth={containerRef.current.clientWidth}
                        containerHeight={384} // h-96 = 384px
                      />
                    )}

                    {/* Play/Pause Overlay */}
                    {!isVideoPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 rounded-full p-4">
                          <svg className="w-8 h-8 text-[#3a7c3a]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Detection indicator */}
                    {enableDetection && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                        🔴 DETECTING
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-96 bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500">Klik "Insert Video" untuk memulai analisis</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Results Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#3a7c3a]">Hasil</h2>
              <h3 className="text-xl text-[#3a7c3a]">Analisis</h3>
            </div>

            {/* Analysis Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Koordinat Card */}
              <div className="bg-[#f0f9f0] rounded-lg p-4 border border-[#c8eac8]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#3a7c3a] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#3a7c3a]">Koordinat</h4>
                </div>
                <p className="text-gray-700 font-medium">-7.782333, 110.367083</p>
              </div>

              {/* Lokasi Card */}
              <div className="bg-[#f0f9f0] rounded-lg p-4 border border-[#c8eac8]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#3a7c3a] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#3a7c3a]">Lokasi</h4>
                </div>
                <p className="text-gray-700 font-medium">Sidoarum, Godean, Sleman, Daerah Istimewa Yogyakarta</p>
              </div>

              {/* Jumlah Terdeteksi Card */}
              <div className="bg-[#f0f9f0] rounded-lg p-4 border border-[#c8eac8]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#3a7c3a] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-[#3a7c3a]">Jumlah Terdeteksi</h4>
                </div>
                <p className="text-gray-700 font-medium">
                  {isDetecting ? `${totalObjects} objek` : "1 tumpukan sampah"}
                </p>
              </div>
            </div>

            {/* Additional Analysis Details */}
            {isVideoInserted && (
              <div className="mt-6 p-4 bg-[#f8fcf8] rounded-lg border border-[#c8eac8]">
                <h4 className="font-semibold text-[#3a7c3a] mb-3">Detail Analisis</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Ukuran Area:</span>
                    <p className="font-medium">~200m²</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tingkat Keparahan:</span>
                    <p className="font-medium text-orange-600">
                      {totalObjects > 3 ? "Tinggi" : totalObjects > 1 ? "Sedang" : "Rendah"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Detection Mode:</span>
                    <p className="font-medium">
                      {isDetecting ? "Real-time" : "Static"}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className={`font-medium ${totalObjects > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {totalObjects > 0 ? "Terdeteksi" : "Bersih"}
                    </p>
                  </div>
                </div>

                {/* Real-time detection details */}
                {isDetecting && detections.length > 0 && (
                  <div className="mt-4 p-3 bg-white rounded border">
                    <h5 className="font-medium text-[#3a7c3a] mb-2">Deteksi Real-time:</h5>
                    <div className="space-y-1 text-xs max-h-20 overflow-y-auto">
                      {detections.map((detection, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span>{detection.class}</span>
                          <span className="font-medium">{Math.round(detection.confidence * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
