package <%= group %>;

/**
 * Class that can hold basic static things that are better not hard-coded
 * like mod details, texture paths, ID's...
 * @author <%= author %>
 *
 */
@SuppressWarnings("javadoc")
public class Reference {
	
    // Mod info
    public static final String MOD_ID = "<%= modid %>";
    public static final String MOD_NAME = "<%= modname %>";
    public static final String MOD_VERSION = "@VERSION@";
    public static final String MOD_BUILD_NUMBER = "@BUILD_NUMBER@";
    public static final String MOD_CHANNEL = MOD_ID;
    public static final String MOD_MC_VERSION = "@MC_VERSION@";
    public static final String MOD_FINGERPRINT = "@FINGERPRINT@";

    // Paths
    public static final String TEXTURE_PATH_GUI = "textures/gui/";
    public static final String TEXTURE_PATH_SKINS = "textures/skins/";
    public static final String TEXTURE_PATH_MODELS = "textures/models/";
    public static final String TEXTURE_PATH_ENTITIES = "textures/entities/";
    public static final String TEXTURE_PATH_GUIBACKGROUNDS = "textures/gui/title/background/";
    public static final String TEXTURE_PATH_ITEMS = "textures/items/";
    public static final String TEXTURE_PATH_PARTICLES = "textures/particles/";
    public static final String MODEL_PATH = "models/";
    
    // MOD ID's
    public static final String MOD_FORGE = "forge";
    public static final String MOD_FORGE_VERSION = "@FORGE_VERSION@";
    public static final String MOD_FORGE_VERSION_MIN = "14.23.5.2847";
    public static final String MOD_GALACTICRAFT_CORE = "galacticraftcore";
    public static final String MOD_GALACTICRAFT_PLANETS = "galacticraftplanets";
    public static final String MOD_GALACTICRAFT_VERSION_MIN = "4.0.2.280";
    
    // Dependencies
    public static final String MOD_DEPENDENCIES =
            "required-after:" + MOD_FORGE             + "@[" + MOD_FORGE_VERSION_MIN        + ",);" +
            "required-after:" + MOD_GALACTICRAFT_CORE + "@[" + MOD_GALACTICRAFT_VERSION_MIN + ",);" +
            "required-after:" + MOD_GALACTICRAFT_CORE + "@[" + MOD_GALACTICRAFT_VERSION_MIN + ",);";
}
