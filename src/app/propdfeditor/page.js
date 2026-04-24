"use client";

import React, { useState, useRef, useEffect } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const PdfEditor = () => {
  const [estimatedSize, setEstimatedSize] = useState(0); // État pour la taille en Mo
  const [pages, setPages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pdfjs, setPdfjs] = useState(null);
  const [fileName, setFileName] = useState("mon_document_fusionne");
  
  const [editingPage, setEditingPage] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const cameraCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loadPdfJs = async () => {
      const pdfjsLib = await import('pdfjs-dist');
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      setPdfjs(pdfjsLib);
      let totalBytes = 0;
      for (const p of pages) {
        if (p.type === 'pdf-page' && p.bytes) {
          totalBytes += p.bytes.length;
        } else if (p.file) {
          totalBytes += p.file.size;
        }
      }
      setEstimatedSize(totalBytes / (1024 * 1024)); // Conversion en Mo
    };
    loadPdfJs();

  }, [pages]);

  const saveCroppedImage = async () => {
    if (!completedCrop || !imgRef.current || !editingPage) return;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedUrl = URL.createObjectURL(blob);
      const croppedFile = new File([blob], editingPage.name, { type: 'image/jpeg' });

      setPages(prev => prev.map(p => 
        p.id === editingPage.id 
          ? { ...p, thumbnail: croppedUrl, file: croppedFile } 
          : p
      ));
      setEditingPage(null);
      setCompletedCrop(null);
    }, 'image/jpeg', 0.95);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;
    const newPages = Array.from(pages);
    const [movedItem] = newPages.splice(result.source.index, 1);
    newPages.splice(result.destination.index, 0, movedItem);
    setPages(newPages);
  };

  const takePhoto = () => {
    if (videoRef.current && cameraCanvasRef.current) {
      const video = videoRef.current;
      const canvas = cameraCanvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setPages(prev => [...prev, {
          id: `cam-${Date.now()}`,
          type: 'image',
          thumbnail: url,
          file: file,
          name: file.name
        }]);
        stopCamera();
      }, 'image/jpeg', 0.95);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" },
        audio: false 
      });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      alert("Erreur caméra.");
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const handleFileChange = async (e) => {
    if (!e.target.files || !pdfjs) return;
    setIsProcessing(true);
    const newFiles = Array.from(e.target.files);
    const extractedPages = [];
    try {
      for (const file of newFiles) {
        const arrayBuffer = await file.arrayBuffer();
        if (file.type === 'application/pdf') {
          const loadingTask = pdfjs.getDocument({ data: arrayBuffer.slice(0) });
          const pdf = await loadingTask.promise;
          const pdfLibDoc = await PDFDocument.load(arrayBuffer.slice(0));
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 0.4 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            const singleDoc = await PDFDocument.create();
            const [copied] = await singleDoc.copyPages(pdfLibDoc, [i - 1]);
            singleDoc.addPage(copied);
            extractedPages.push({
              id: `${file.name}-${i}-${Math.random()}`,
              type: 'pdf-page',
              thumbnail: canvas.toDataURL(),
              bytes: await singleDoc.save(),
              name: `${file.name} (p. ${i})`
            });
          }
        } else {
          extractedPages.push({
            id: `${file.name}-${Math.random()}`,
            type: 'image',
            thumbnail: URL.createObjectURL(file),
            file: file,
            name: file.name
          });
        }
      }
      setPages(prev => [...prev, ...extractedPages]);
    } catch (err) { alert("Erreur."); }
    finally { setIsProcessing(false); if (fileInputRef.current) fileInputRef.current.value = ""; }
  };

  const downloadFinalPdf = async () => {
    setIsProcessing(true);
    try {
      const mergedPdf = await PDFDocument.create();
      for (const p of pages) {
        const newPage = mergedPdf.addPage(PageSizes.A4);
        const { width: a4W, height: a4H } = newPage.getSize();
        if (p.type === 'pdf-page') {
          const doc = await PDFDocument.load(p.bytes);
          const [emb] = await mergedPdf.embedPages([doc.getPages()[0]]);
          const s = Math.min(a4W / emb.width, a4H / emb.height);
          newPage.drawPage(emb, { x: (a4W - emb.width * s) / 2, y: (a4H - emb.height * s) / 2, width: emb.width * s, height: emb.height * s });
        } else {
          const bytes = await p.file.arrayBuffer();
          const img = p.file.type === 'image/png' ? await mergedPdf.embedPng(bytes) : await mergedPdf.embedJpg(bytes);
          const s = Math.min(a4W / img.width, a4H / img.height);
          newPage.drawImage(img, { x: (a4W - img.width * s) / 2, y: (a4H - img.height * s) / 2, width: img.width * s, height: img.height * s });
        }
      }
      const bytes = await mergedPdf.save();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }));
      a.download = `${fileName}.pdf`;
      a.click();
    } catch (err) { alert("Erreur fusion."); }
    finally { setIsProcessing(false); }
  };

  const clearAll = () => {
    if (window.confirm("Voulez-vous vraiment supprimer toutes les pages ?")) {
      setPages([]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-screen">
      {/* MODAL CAMÉRA */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black p-4">
          <video ref={videoRef} autoPlay playsInline className="w-full max-w-2xl rounded-lg" />
          <div className="flex gap-4 mt-6">
            <button onClick={stopCamera} className="px-6 py-3 bg-gray-600 text-white rounded-full font-bold">Annuler</button>
            <button onClick={takePhoto} className="w-16 h-16 bg-white border-4 border-blue-500 rounded-full flex items-center justify-center shadow-xl">
              <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
            </button>
          </div>
          <canvas ref={cameraCanvasRef} className="hidden" />
        </div>
      )}

      {/* MODAL ROGNAGE AJUSTÉ À 80% DE HAUTEUR */}
      {editingPage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-4xl w-full max-h-[95vh] flex flex-col overflow-hidden">
            {/* Header fixe */}
            <div className="flex justify-between mb-4 items-center flex-shrink-0">
              <h2 className="text-xl font-bold">Éditer la page</h2>
              <button onClick={() => setEditingPage(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">✕</button>
            </div>
            
            {/* Zone de rognage scrollable */}
            <div className="flex-grow overflow-y-auto bg-gray-50 border rounded-xl flex justify-center items-start p-2">
               <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={c => setCompletedCrop(c)}>
                <img 
                  ref={imgRef} 
                  src={editingPage.thumbnail} 
                  onLoad={(e) => {
                    const { width, height } = e.currentTarget;
                    setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 100 }, 1, width, height), width, height));
                  }} 
                  alt="Edit" 
                  className="max-w-full h-auto object-contain" 
                />
              </ReactCrop>
            </div>
            
            {/* Footer fixe */}
            <div className="mt-4 flex-shrink-0">
                <button 
                onClick={saveCroppedImage} 
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"
                >
                Valider le rognage
                </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-2xl p-6 border border-gray-200">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 uppercase">SCAN PRO</h1>
          <p className="text-gray-500 italic">Scanner professionnel de poche</p>
        </header>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="pages-grid" direction="horizontal">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef} 
                className="flex flex-wrap gap-5 mb-8 min-h-[220px] justify-center bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200"
              >
                {pages.map((p, i) => (
                  <Draggable key={p.id} draggableId={p.id} index={i}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps} 
                        className={`relative w-36 bg-white border-2 rounded-xl transition-all ${
                          snapshot.isDragging 
                            ? 'shadow-2xl ring-4 ring-blue-500 scale-110 z-50 border-blue-500' 
                            : 'border-white shadow-md hover:border-gray-300'
                        }`}
                        onClick={() => p.type === 'image' && setEditingPage(p)}
                      >
                        <div className="aspect-[3/4] flex items-center justify-center p-2">
                          <img src={p.thumbnail} className="max-w-full max-h-full object-contain pointer-events-none rounded shadow-sm" />
                        </div>
                        <div className="p-2 bg-gray-50 flex border-t">
                            <button onClick={(e) => { e.stopPropagation(); setPages(pages.filter(x => x.id !== p.id)); }} className="w-full text-[10px] font-bold text-red-500 uppercase">Supprimer</button>
                        </div>
                        <div className="absolute -top-2 -left-2 w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black shadow-lg">
                          {i + 1}
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
          <label className="px-6 py-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg font-bold hover:bg-blue-100 transition flex items-center justify-center gap-2 cursor-pointer">
            📁 Fichiers
            <input ref={fileInputRef} type="file" multiple accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
          </label>
          <button onClick={startCamera} className="px-6 py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg font-bold hover:bg-emerald-100 transition flex items-center justify-center gap-2">
            📸 Appareil Photo
          </button>
          {pages.length > 0 && (
            <button onClick={clearAll} className="px-6 py-4 bg-red-50 border border-red-200 text-red-600 rounded-lg font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
              🗑️ Tout effacer
            </button>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 font-medium tracking-tight uppercase">Taille finale estimée : ~{estimatedSize.toFixed(2)} Mo</p>

        {pages.length > 0 && (
          <div className="pt-6 border-t space-y-4">
            <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} className="w-full px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 ring-blue-500 outline-none font-medium" placeholder="Nom du document final" />
            <button onClick={downloadFinalPdf} disabled={isProcessing} className="w-full py-4 bg-black text-white rounded-2xl font-black text-lg shadow-xl active:scale-[0.98] transition-transform hover:bg-gray-900">
              {isProcessing ? "CRÉATION EN COURS..." : `GÉNÉRER LE PDF (${pages.length} PAGES)`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfEditor;