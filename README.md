# valmeter

**Fully-featured Discord RPC for VALORANT powered by Rainmeter and Lua.**

## Installation

1. Install the latest stable version of Rainmeter if you don't have it already. [`Download`](https://rainmeter.net).
2. Go to the latest version in [`Releases`](https://github.com/frissyn/valmeter/releases) and zownload the `.zip` file. Unzip the folder.
3. From here you can do two things:
    + **Recommended:**
        1. Launch the `.rmskin` installer
        2. Install the skin, Rainmeter will auto-build it.
    + **Alternative:**
        1. Move the `valmeter` skin folder into your `Rainmeter/Skins` folder.
        2. Configure the skin how you want to.

## Usage

**RPC:** Load the skin from Rainmeter's skin menu. The skin UI should appear on your desktop if everything was installed properly. `valmeter` will automatically watch your computer's open processes and start the Rich Prescense when `RiotClientServices.exe` and `VALORANT.exe` are running.

**Settings:** Load the `Settings/settings.ini` skin or click the cog on the `valmeter.ini` skin to open the settings menu. Here you can configure your game's location path, RPC update interval, etc.

## Developement & Contributing

**Contributing:**

1. Fork the repository: [`Fork`](https://github.com/frissyn/valmeter/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request! 🎉

**Developement:**

The `valmeter` project consists of three main functions: the Rainmeter skin, game process reading, and the Discord RPC. The most crucial of which is reading your `RiotClientServices.exe`'s network requests. This allows `valmeter` to get what you're currently doing in the game and create a corresponding RPC. The only data `valmeter` reads are your account PUUID and session data. These values are read-only and are openly available on your computer while VALORANT is running. `valmeter` has no malicious intent. `=D`