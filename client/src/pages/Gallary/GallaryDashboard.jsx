
// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { column as baseColumns } from '../../utils/GalleryHelper';
// import api from '../../utils/api';

// const GallaryDashboard = () => {
//   const [loading, setLoading] = useState(false);
//   const [gallery, setGallery] = useState([]);

//   useEffect(() => {
//     const getAll = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/api/gallery/', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//         if (Array.isArray(response.data)) {
//           let sno = 1;
//           const data = response.data.map((g) => ({
//             _id: g._id,
//             sno: sno++,
//             title: g.title,
//             imageUrl: g.imageUrl,
//             videoUrl: g.videoUrl,
//             action: <button className="text-red-500 hover:underline">Delete</button>
//           }));

//           setGallery(data);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getAll();
//   }, []);

//   // Enhanced columns to preview images/videos from array
//   const column = baseColumns.map(col => {
//     if (col.name === 'Image') {
//       return {
//         ...col,
//         cell: row => (
//           <div className="flex gap-2">
//             {row.file?.filter(f => f.type?.startsWith('image')).map((f, i) => (
//               <img
//                 key={i}
//                 src={f.url}
//                 alt={`preview-${i}`}
//                 className="h-16 w-20 object-cover rounded"
//               />
//             ))}
//           </div>
//         )
//       };
//     }

//     if (col.name === 'Video') {
//       return {
//         ...col,
//         cell: row => (
//           <div className="flex gap-2">
//             {row.file?.filter(f => f.type?.startsWith('video')).map((f, i) => (
//               <video
//                 key={i}
//                 src={f.url}
//                 controls
//                 className="h-20 w-28 rounded"
//               />
//             ))}
//           </div>
//         )
//       };
//     }

//     return col;
//   });

//   return (
//     <div className="p-4">
//       <div className="text-center text-2xl font-semibold mb-4">
//         <h6>Manage Gallery</h6>
//       </div>

//       {loading ? (
//         <div className="flex flex-col gap-4">
//           {Array.from({ length: 5 }).map((_, idx) => (
//             <div key={idx} className="animate-pulse bg-gray-200 h-16 rounded w-full" />
//           ))}
//         </div>
//       ) : (
//         <DataTable
//           columns={column}
//           data={gallery || []}
//           pagination
//           highlightOnHover
//           pointerOnHover
//           responsive
//         />
//       )}
//     </div>
//   );
// };

// export default GallaryDashboard;


import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import api from '../../utils/api';
import { column as baseColumns } from '../../utils/GalleryHelper';

const GallaryDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        setLoading(true);
        const response = await api.get('/gallery/', {withCredentials: true });

        if (Array.isArray(response.data)) {
          const data = response.data.map((g, index) => ({
            _id: g._id,
            sno: index + 1,
            title: g.title,
            imageUrl: g.imageUrl, 
            videoUrl: g.videoUrl,
            action: <button className="text-red-500 hover:underline">Delete</button>
          }));

          setGallery(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAll();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-center text-2xl font-semibold mb-4">Manage Gallery</h2>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="animate-pulse bg-gray-200 h-16 rounded w-full" />
          ))}
        </div>
      ) : (
        <DataTable
          columns={baseColumns}
          data={gallery}
          pagination
          highlightOnHover
          responsive
        />
      )}
    </div>
  );
};

export default GallaryDashboard;
