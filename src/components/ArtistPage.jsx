import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { VinylRecord } from "./VinylRecord.tsx";
import { Button } from "./ui/Button.tsx";
import { ShoppingCart, Heart } from "lucide-react";
import { albums } from "./Albums.jsx";

export const ArtistPage = () => {
  const { artistName } = useParams();
  const [hoveredId, setHoveredId] = useState(null);
  

  const artistAlbums = albums.filter(
    album => album.artist.toLowerCase().replace(/\s+/g, '-') === artistName
  );
  

  const artist = artistAlbums[0]?.artist || "Artist";

  if (artistAlbums.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Artist Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            ← Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const getAccentColors = (color) => {
    const colorMap = {
      red: { border: "border-red-500/50", text: "group-hover:text-red-500" },
      blue: { border: "border-blue-500/50", text: "group-hover:text-blue-500" },
      purple: { border: "border-purple-500/50", text: "group-hover:text-purple-500" },
      green: { border: "border-green-500/50", text: "group-hover:text-green-500" },
      orange: { border: "border-orange-500/50", text: "group-hover:text-orange-500" },
      pink: { border: "border-pink-500/50", text: "group-hover:text-pink-500" },
      yellow: { border: "border-yellow-500/50", text: "group-hover:text-yellow-500" },
      amber: { border: "border-amber-600/50", text: "group-hover:text-amber-600" },
      gray: { border: "border-gray-500/50", text: "group-hover:text-gray-500" },
      default: { border: "border-primary/50", text: "group-hover:text-primary" }
    };
    return colorMap[color || "default"] || colorMap.default;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Link to="/" className="text-primary hover:underline mb-8 inline-block">
          ← Ana səhifəyə qayıt
        </Link>
        
        {/* Artist Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4">
            {artist}
          </h1>
          <p className="text-xl text-muted-foreground">
            {artistAlbums.length} albom{artistAlbums.length > 1 ? '' : ''}
          </p>
        </div>

        {/* Albums Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {artistAlbums.map((album) => {
            const accentColors = getAccentColors(album.accentColor);
            return (
              <Link
                key={album.id}
                to={`/album/${album.id}`}
                className={`group relative bg-card rounded-xl p-6 border transition-all duration-300 cursor-pointer ${accentColors.border} hover:shadow-lg block`}
                onMouseEnter={() => setHoveredId(album.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {album.isNew && (
                  <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10">
                    YENI
                  </span>
                )}

                <div className="relative h-48 flex items-center justify-center mb-6">
                  {album.image && (
                    <div className="absolute inset-0 flex items-center justify-start pl-4">
                      <div className="w-40 h-40 rounded-lg overflow-hidden shadow-xl">
                        <img 
                          src={album.image} 
                          alt={`${album.title} cover`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className={`relative transition-transform duration-500 ease-out ${
                      hoveredId === album.id ? "translate-x-16" : "translate-x-0"
                    }`}
                    style={{ marginLeft: '20px' }}
                  >
                    <VinylRecord 
                      size="md" 
                      spinning={hoveredId === album.id}
                      vinylColor={album.vinylColor}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-serif text-xl font-bold transition-colors ${accentColors.text}`}>
                        {album.title}
                      </h3>
                      <p className="text-muted-foreground">{album.year}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-primary shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to favorites logic
                      }}
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-secondary rounded">{album.genre}</span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <p className="text-2xl font-serif font-bold">{album.price} ₼</p>
                    <Button 
                      size="sm" 
                      className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic
                      }}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Səbətə əlavə et
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};