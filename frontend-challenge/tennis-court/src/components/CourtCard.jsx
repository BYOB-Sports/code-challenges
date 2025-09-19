"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Chip,
  Skeleton,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CourtCard({ court }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <Link href={`/court/${court.id}`} style={{ textDecoration: "none" }}>
      <div>
        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            boxShadow: 2,
            "&:hover": {
              transform: "translateY(-5px)",
              boxShadow: 6,
              transition: "0.3s",
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 180,
              position: "relative",
              backgroundColor: "#e0e0e0",
            }}
          >
            {!imgLoaded && (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}

            <Image
              src={court.photo || "/placeholder.webp"}
              alt={court.name || "Court"}
              fill
              style={{
                objectFit: "cover",
                display: imgLoaded ? "block" : "none",
              }}
              onLoad={() => setImgLoaded(true)}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4//8/AwAI/AL+KD3eAAAAAElFTkSuQmCC"
              priority
              sizes="(max-width: 600px) 100vw,
                    (max-width: 900px) 50vw,
                    (max-width: 1200px) 33vw,
                    270px"
            />
          </Box>

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {court?.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Rating value={court?.rating} readOnly size="small" />
              <Chip label={court?.type} size="small" color="secondary" />
            </Box>

            <Typography variant="body2" color="text.secondary">
              {court?.location}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
}
