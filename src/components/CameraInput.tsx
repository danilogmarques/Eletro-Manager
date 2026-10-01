import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function CameraInput() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [cameraError, setCameraError] = useState<boolean>(false);

  // Inicia a câmera automaticamente ao montar o componente
  useEffect(() => {
    async function startCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
        setCameraError(true);
      }
    }

    startCamera();

    // Limpa o stream da câmera quando o componente é desmontado
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Captura a foto do feed de vídeo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Desenha o frame atual do vídeo no canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Converte para base64 (Data URL)
        const imageDataUrl = canvas.toDataURL('image/png');
        setPhoto(imageDataUrl);
      }
    }
  };

  // Limpa a foto tirada e volta para o feed da câmera
  const resetPhoto = () => {
    setPhoto(null);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-card text-card-foreground border rounded-xl shadow-sm">
      {/* Bloco 1: Campo de Texto do shadcn/ui */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Sua anotação ou comentário
        </label>
        <Textarea
          placeholder="Digite algo sobre esta foto..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          className="resize-none min-h-[100px]"
        />
      </div>

      {/* Bloco 2: Área da Câmera / Foto */}
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none">Capturar Imagem</label>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center">
          {cameraError && !photo && (
            <p className="text-sm text-destructive px-4 text-center">
              Não foi possível acessar a câmera. Verifique as permissões do navegador.
            </p>
          )}

          {/* Canvas oculto para processar a captura */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Feed da Câmera (só renderiza se não houver foto tirada) */}
          {!photo ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover scale-x-[-1]" // Espelha a câmera para parecer um espelho natural
            />
          ) : (
            /* Foto Capturada */
            <img
              src={photo}
              alt="Preview"
              className="w-full h-full object-cover scale-x-[-1]"
            />
          )}
        </div>
      </div>

      {/* Bloco 3: Controles dinâmicos com Botões do shadcn/ui */}
      <div className="flex gap-2">
        {!photo ? (
          <Button 
            onClick={capturePhoto} 
            disabled={cameraError} 
            className="w-full gap-2"
          >
            <Camera className="w-4 h-4" />
            Tirar Foto
          </Button>
        ) : (
          <>
            <Button 
              onClick={resetPhoto} 
              variant="outline" 
              className="w-full gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Tirar Outra
            </Button>
            <Button 
              onClick={() => { setPhoto(null); setText(''); }} 
              variant="destructive"
              size="icon"
              title="Limpar tudo"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
