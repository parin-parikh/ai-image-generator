// const fetchImages = () => fetch("/api/getImages", {cache: "no-store"}).then((res) => res.json());

// export default fetchImages;

//option 2
// const fetchImages = async () => {
//     try {
//       const res = await fetch("/api/getImages", { cache: "no-store" });
  
//       if (!res.ok) {
//         throw new Error(`Error fetching images: ${res.statusText}`);
//       }
  
//       return await res.json();
//     } catch (error) {
//       console.error("Fetch Images Error:", error);
//       throw error;
//     }
//   };
  
//   export default fetchImages;

const fetchImages = async () => {
    const response = await fetch('/api/getImages', { cache: 'no-store' });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Directly parse JSON
    return data;
};

export default fetchImages;
  