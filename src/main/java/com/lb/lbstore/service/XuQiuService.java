/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.XuQiu;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface XuQiuService {

    public XuQiu getXuQiuById(Integer id);
    
    public List<XuQiu> getAllXuQius(Integer qy_id);
    
    public boolean existXuQiu(Integer qy_id, Integer id, String mc);
    
    public boolean updateXuQiu(XuQiu xuQiu);
    
    public XuQiu saveXuQiu(XuQiu xuQiu);
    
    public boolean deleteXuQiu(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<XuQiu> queryXuQiusByPage(HashMap map);

}
