# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia el .csproj y restaura dependencias
COPY DigitalArs.csproj ./
RUN dotnet restore DigitalArs.csproj

# Copia todo el código y compila
COPY . ./
RUN dotnet publish -c Release -o /app/publish

# Etapa 2: Imagen runtime, solo con lo necesario
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Exponer puerto (ajustá si tu app escucha en otro)
EXPOSE 8080

ENTRYPOINT ["dotnet", "DigitalArs.dll"]