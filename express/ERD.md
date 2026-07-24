# Part 2 – Musicana Records ERD

## Entities & attributes
- **MUSICIAN**: ID (PK), Name, Street, City, Phone
- **INSTRUMENT**: Name (PK), MusicalKey
- **ALBUM**: AlbumID (PK), Title (unique), CopyrightDate
- **SONG**: Title (PK), Author

## Relationships
- **Plays** (Musician M:N Instrument) — a musician may play several instruments, an instrument may be played by several musicians.
- **Performs** (Musician M:N Song) — a song is performed by one or more musicians, a musician performs several songs.
- **Contains** (Album 1:N Song) — an album has many songs, but each song belongs to exactly one album.
- **Produces** (Musician 1:N Album) — each album has exactly one producer (a musician), and a musician may produce several albums.

## Mermaid source
```
erDiagram
  MUSICIAN }o--o{ INSTRUMENT : plays
  MUSICIAN }o--o{ SONG : performs
  ALBUM ||--o{ SONG : contains
  MUSICIAN ||--o{ ALBUM : produces
  MUSICIAN {
    int ID PK
    string Name
    string Street
    string City
    string Phone
  }
  INSTRUMENT {
    string Name PK
    string MusicalKey
  }
  ALBUM {
    string AlbumID PK
    string Title
    date CopyrightDate
  }
  SONG {
    string Title PK
    string Author
  }
```
