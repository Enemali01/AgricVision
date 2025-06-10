export const column = [
  {
    name: 'SN',
    selector: row => row.sno,
    width: '80px',
  },
  {
    name: 'Title',
    selector: row => row.title,
    center: true,
  },
  {
    name: 'Image',
    cell: (row) => {
      const src = row.imageUrl?.[0]; 
      return src ? (
        <img
          src={src}
          alt="image"
          className="w-20 h-16 object-cover rounded"
        />
      ) : (
        <span className="text-gray-400 italic">No Image</span>
      );
    },
    center: 'true',
  },
  {
    name: 'Video',
    cell: (row) => {
      const src = row.videoUrl?.[0];
      return src ? (
        <video src={src} controls className="w-28 h-20 rounded" />
      ) : (
        <span className="text-gray-400 italic">No Video</span>
      );
    },
    center: 'true',
  },
  {
    name: 'Action',
    selector: row => row.action,
    center: 'true',
  }
];
