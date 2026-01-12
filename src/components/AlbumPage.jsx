import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import { albums } from "./Albums.jsx";

export const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  
  const album = albums.find(a => a.id === parseInt(albumId));

  if (!album) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Albom Tapılmadı</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const artistSlug = album.artist.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Geri
        </Button>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Album Art from Cloudinary */}
          <div className="sticky top-8">
            <div className="relative aspect-square max-w-xl mx-auto">
              {album.image && !imageError ? (
                <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl transform transition-transform duration-300 hover:scale-105">
                  <img 
                    src={album.image} 
                    alt={`${album.title} cover`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-xl overflow-hidden shadow-2xl bg-card border border-border flex items-center justify-center">
                  <div className="text-center p-8">
                    <p className="text-muted-foreground">Şəkil yüklənə bilmədi</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Album Info */}
          <div className="space-y-6">
            {album.isNew && (
              <span className="inline-block bg-primary text-primary-foreground text-sm font-bold px-4 py-2 rounded-full">
                YENI BURAXILIŞ
              </span>
            )}

            <div>
              <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
                {album.title}
              </h1>
              <Link 
                to={`/artist/${artistSlug}`}
                className="text-2xl text-muted-foreground hover:text-primary transition-colors"
              >
                {album.artist}
              </Link>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="px-3 py-1 bg-secondary rounded-lg">{album.genre}</span>
              <span>•</span>
              <span>{album.year}</span>
              <span>•</span>
              <span className="capitalize">{album.vinylColor} Vinyl</span>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {album.description}
            </p>

            <div className="pt-6 border-t border-border">
              <p className="text-4xl font-serif font-bold mb-6">{album.price} ₼</p>
              
              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Səbətə əlavə et
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="gap-2"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t border-border space-y-4">
              <h3 className="text-xl font-serif font-bold">Məhsul Haqqında</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Orijinal vinil qeyd</li>
                <li>• {album.vinylColor} rəng vinil</li>
                <li>• Yüksək keyfiyyətli audio</li>
                <li>• Sınmaz qablaşdırma ilə göndərilir</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};