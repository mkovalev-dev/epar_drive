FROM mcr.microsoft.com/dotnet/aspnet AS base
WORKDIR /app
FROM mcr.microsoft.com/dotnet/sdk AS build
WORKDIR /src
COPY ["open_xlsx_files.csproj", "./"]
RUN dotnet restore "./open_xlsx_files.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "open_xlsx_files.csproj" -c Release -o /app/build
FROM build AS publish
RUN dotnet publish "open_xlsx_files.csproj" -c Release -o /app/publish
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "open_xlsx_files.dll"]