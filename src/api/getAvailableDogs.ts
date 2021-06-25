import { insideCircle } from "geolocation-utils";
import usZips from "us-zips";
import fetch from "node-fetch";

const token = process.env.CALENDLY_TOKEN;
const CALENDLY_API_URL = `https://api.calendly.com`;

// const DOG_API_URL = `https://api.thedogapi.com/v1`;

export default async (req, res) => {
  const searchGeo = usZips[req.query.zip];
  const searchBreed = req.query.breed;

  const currentUser = await fetch(`${CALENDLY_API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const user = await currentUser.json();

  const breedsRes = await fetch(
    `${CALENDLY_API_URL}/event_types?sort=name%3Aasc&count=20&user=${user?.resource?.uri}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const breeds = await breedsRes.json();
  const collection = breeds?.collection;

  let results;

  results = collection.map((breedInfo) => {
    let metadata = {} as any;
    try {
      metadata = JSON.parse(breedInfo?.description_plain);
    } catch (e) {
      console.error(e);
    }

    const info = {
      duration: breedInfo?.duration,
      uri: breedInfo?.uri,
      ...metadata,
      imageUrl: metadata?.imageUrl
        ? `https://` + metadata?.imageUrl
        : undefined,
    };

    return info;
  });

  // Geo Filter
  if (searchGeo) {
    results = results.filter((dog) => {
      return insideCircle(
        {
          lat: Number(dog?.lat),
          lon: Number(dog?.lon),
        },
        {
          lat: searchGeo.latitude,
          lon: searchGeo.longitude,
        },
        1000000
      );
    });
  }

  // Breed Filter
  if (searchBreed !== "All Breeds") {
    results = results.filter((dog) => {
      return dog.breed == searchBreed;
    });
  }

  res.status(200).json(results);
};
