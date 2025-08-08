"use client";
import Sidebar from "../section/Sidebar";
import { useEffect, useRef, useState } from "react";

export default function AnalisisPage() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoInserted, setIsVideoInserted] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInsertVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    // Revoke previous URL if any
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setIsVideoInserted(true);
    setIsVideoPlaying(true);
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
    alert("Laporan berhasil dibuat!");
  };

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVideoPlaying]);

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
                onClick={handleReport}
                className="w-full bg-[#b6e6b6] border border-[#3a7c3a] text-black py-3 px-4 rounded-lg font-medium hover:bg-[#a3d6a3] transition-colors"
              >
                Report
              </button>
            </div>

            {/* Video Display - Right Side */}
            <div className="lg:col-span-3">
              <div className="bg-white border-2 border-white rounded-lg overflow-hidden shadow-lg">
                {isVideoInserted && videoUrl ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      className="w-full h-96 object-cover"
                      muted
                      autoPlay
                      playsInline
                    />
                    
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
                    {/* Detection box (placeholder) */}
                    <div className="absolute border-4 border-[#6bd36b]" style={{ top: "28%", left: "48%", width: "72px", height: "72px" }} />
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
                <p className="text-gray-700 font-medium">1 tumpukan sampah</p>
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
                    <p className="font-medium text-orange-600">Sedang</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Akurasi Deteksi:</span>
                    <p className="font-medium">95.3%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-green-600">Terdeteksi</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
