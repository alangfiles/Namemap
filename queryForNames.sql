WITH base AS (
  SELECT
    AVG(COALESCE(year_1880s_m, 0)) AS year_1880s_m,
    AVG(COALESCE(year_1880s_f, 0)) AS year_1880s_f,
    AVG(COALESCE(year_1890s_m, 0)) AS year_1890s_m,
    AVG(COALESCE(year_1890s_f, 0)) AS year_1890s_f,
    AVG(COALESCE(year_1900s_m, 0)) AS year_1900s_m,
    AVG(COALESCE(year_1900s_f, 0)) AS year_1900s_f,
    AVG(COALESCE(year_1910s_m, 0)) AS year_1910s_m,
    AVG(COALESCE(year_1910s_f, 0)) AS year_1910s_f,
    AVG(COALESCE(year_1920s_m, 0)) AS year_1920s_m,
    AVG(COALESCE(year_1920s_f, 0)) AS year_1920s_f,
    AVG(COALESCE(year_1930s_m, 0)) AS year_1930s_m,
    AVG(COALESCE(year_1930s_f, 0)) AS year_1930s_f,
    AVG(COALESCE(year_1940s_m, 0)) AS year_1940s_m,
    AVG(COALESCE(year_1940s_f, 0)) AS year_1940s_f,
    AVG(COALESCE(year_1950s_m, 0)) AS year_1950s_m,
    AVG(COALESCE(year_1950s_f, 0)) AS year_1950s_f,
    AVG(COALESCE(year_1960s_m, 0)) AS year_1960s_m,
    AVG(COALESCE(year_1960s_f, 0)) AS year_1960s_f,
    AVG(COALESCE(year_1970s_m, 0)) AS year_1970s_m,
    AVG(COALESCE(year_1970s_f, 0)) AS year_1970s_f,
    AVG(COALESCE(year_1980s_m, 0)) AS year_1980s_m,
    AVG(COALESCE(year_1980s_f, 0)) AS year_1980s_f,
    AVG(COALESCE(year_1990s_m, 0)) AS year_1990s_m,
    AVG(COALESCE(year_1990s_f, 0)) AS year_1990s_f,
    AVG(COALESCE(year_2000s_m, 0)) AS year_2000s_m,
    AVG(COALESCE(year_2000s_f, 0)) AS year_2000s_f,
    AVG(COALESCE(year_2010s_m, 0)) AS year_2010s_m,
    AVG(COALESCE(year_2010s_f, 0)) AS year_2010s_f,
    AVG(COALESCE(year_2020s_m, 0)) AS year_2020s_m,
    AVG(COALESCE(year_2020s_f, 0)) AS year_2020s_f
  FROM names_normalized
  WHERE name IN  ('Ebenezer', 'Moses', 'Malachi', 'Simeon')
)
SELECT
  other.name,
  SQRT(
    (COALESCE(other.year_1880s_m, 0) - base.year_1880s_m) * (COALESCE(other.year_1880s_m, 0) - base.year_1880s_m) +
    (COALESCE(other.year_1880s_f, 0) - base.year_1880s_f) * (COALESCE(other.year_1880s_f, 0) - base.year_1880s_f) +
    (COALESCE(other.year_1890s_m, 0) - base.year_1890s_m) * (COALESCE(other.year_1890s_m, 0) - base.year_1890s_m) +
    (COALESCE(other.year_1890s_f, 0) - base.year_1890s_f) * (COALESCE(other.year_1890s_f, 0) - base.year_1890s_f) +
    (COALESCE(other.year_1900s_m, 0) - base.year_1900s_m) * (COALESCE(other.year_1900s_m, 0) - base.year_1900s_m) +
    (COALESCE(other.year_1900s_f, 0) - base.year_1900s_f) * (COALESCE(other.year_1900s_f, 0) - base.year_1900s_f) +
    (COALESCE(other.year_1910s_m, 0) - base.year_1910s_m) * (COALESCE(other.year_1910s_m, 0) - base.year_1910s_m) +
    (COALESCE(other.year_1910s_f, 0) - base.year_1910s_f) * (COALESCE(other.year_1910s_f, 0) - base.year_1910s_f) +
    (COALESCE(other.year_1920s_m, 0) - base.year_1920s_m) * (COALESCE(other.year_1920s_m, 0) - base.year_1920s_m) +
    (COALESCE(other.year_1920s_f, 0) - base.year_1920s_f) * (COALESCE(other.year_1920s_f, 0) - base.year_1920s_f) +
    (COALESCE(other.year_1930s_m, 0) - base.year_1930s_m) * (COALESCE(other.year_1930s_m, 0) - base.year_1930s_m) +
    (COALESCE(other.year_1930s_f, 0) - base.year_1930s_f) * (COALESCE(other.year_1930s_f, 0) - base.year_1930s_f) +
    (COALESCE(other.year_1940s_m, 0) - base.year_1940s_m) * (COALESCE(other.year_1940s_m, 0) - base.year_1940s_m) +
    (COALESCE(other.year_1940s_f, 0) - base.year_1940s_f) * (COALESCE(other.year_1940s_f, 0) - base.year_1940s_f) +
    (COALESCE(other.year_1950s_m, 0) - base.year_1950s_m) * (COALESCE(other.year_1950s_m, 0) - base.year_1950s_m) +
    (COALESCE(other.year_1950s_f, 0) - base.year_1950s_f) * (COALESCE(other.year_1950s_f, 0) - base.year_1950s_f) +
    (COALESCE(other.year_1960s_m, 0) - base.year_1960s_m) * (COALESCE(other.year_1960s_m, 0) - base.year_1960s_m) +
    (COALESCE(other.year_1960s_f, 0) - base.year_1960s_f) * (COALESCE(other.year_1960s_f, 0) - base.year_1960s_f) +
    (COALESCE(other.year_1970s_m, 0) - base.year_1970s_m) * (COALESCE(other.year_1970s_m, 0) - base.year_1970s_m) +
    (COALESCE(other.year_1970s_f, 0) - base.year_1970s_f) * (COALESCE(other.year_1970s_f, 0) - base.year_1970s_f) +
    (COALESCE(other.year_1980s_m, 0) - base.year_1980s_m) * (COALESCE(other.year_1980s_m, 0) - base.year_1980s_m) +
    (COALESCE(other.year_1980s_f, 0) - base.year_1980s_f) * (COALESCE(other.year_1980s_f, 0) - base.year_1980s_f) +
    (COALESCE(other.year_1990s_m, 0) - base.year_1990s_m) * (COALESCE(other.year_1990s_m, 0) - base.year_1990s_m) +
    (COALESCE(other.year_1990s_f, 0) - base.year_1990s_f) * (COALESCE(other.year_1990s_f, 0) - base.year_1990s_f) +
    (COALESCE(other.year_2000s_m, 0) - base.year_2000s_m) * (COALESCE(other.year_2000s_m, 0) - base.year_2000s_m) +
    (COALESCE(other.year_2000s_f, 0) - base.year_2000s_f) * (COALESCE(other.year_2000s_f, 0) - base.year_2000s_f) +
    (COALESCE(other.year_2010s_m, 0) - base.year_2010s_m) * (COALESCE(other.year_2010s_m, 0) - base.year_2010s_m) +
    (COALESCE(other.year_2010s_f, 0) - base.year_2010s_f) * (COALESCE(other.year_2010s_f, 0) - base.year_2010s_f) +
    (COALESCE(other.year_2020s_m, 0) - base.year_2020s_m) * (COALESCE(other.year_2020s_m, 0) - base.year_2020s_m) +
    (COALESCE(other.year_2020s_f, 0) - base.year_2020s_f) * (COALESCE(other.year_2020s_f, 0) - base.year_2020s_f)
  ) AS distance
FROM names_normalized AS other, base
WHERE other.name NOT IN ('Ebenezer', 'Moses', 'Malachi', 'Simeon')
ORDER BY distance ASC
LIMIT 10;
